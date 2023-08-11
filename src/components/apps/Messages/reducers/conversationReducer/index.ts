import {DigestedConversationType, ExchangeBlockType} from '../../context/types';
import {
  AddMessagePayloadType,
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
  ConversationReducerConfigurationType,
  DigestedMessageProps,
} from './types';
import {
  createSkBubbleFromExchange,
  createSkBubbleFromMessage,
  convertToPathExchanges,
  getListHeight,
} from './digestion';
import {createTimeItem} from './digestion/TimeItem';
import {findAvailableRoutes} from './routing/available';
import {produce} from 'immer';
import {CONTACT_NAMES} from '../../context/usersMapping';
import {convertMessageToString} from '../../context/conversationFunctions';
import {
  EVENTS_REDUCER_ACTIONS,
  EventOrchestraObjectType,
} from 'components/EventOrchestra/reducers/types';
import {isMessageWithMeta} from './routing/seen';
import {DigestedConversationListItem, MESSAGE_TYPE} from './digestion/types';
import {BubblePath} from './digestion/BubblePath';

const createConversationReducer =
  (config: ConversationReducerConfigurationType) =>
  (
    state: DigestedConversationType | undefined | null,
    action: ConversationReducerActionsType,
  ) =>
    conversationReducer(state, action, config);

const conversationReducer = produce(
  (
    draft: DigestedConversationType | undefined | null,
    action: ConversationReducerActionsType,
    config: ConversationReducerConfigurationType,
  ) => {
    switch (action.type) {
      case CONVERSATION_REDUCER_ACTIONS.ADD_CONVERSATION:
        return addConversation(config, draft, action.payload);
      case CONVERSATION_REDUCER_ACTIONS.ADD_MESSAGE_FROM_BLOCK:
        return addMessageFromBlock(
          config,
          draft,
          action.payload.block,
          action.payload.index,
        );
      case CONVERSATION_REDUCER_ACTIONS.ADD_MESSAGE:
        return addMessage(config, draft, action.payload);
      case CONVERSATION_REDUCER_ACTIONS.CONTINUE_ROUTE:
        return continueRoute(config, draft);
      case CONVERSATION_REDUCER_ACTIONS.REFRESH_AVAILABLE_ROUTE:
        return refreshAvailableRoute(config, draft, action.payload);
      case CONVERSATION_REDUCER_ACTIONS.START_ROUTE:
        return startRoute(config, draft, action.payload);
      case CONVERSATION_REDUCER_ACTIONS.UPDATE_MESSAGE:
        return updateMessage(draft, action.payload.props, action.payload.index);
      case CONVERSATION_REDUCER_ACTIONS.RESET:
        return null;
      default:
        return draft;
    }
  },
);

const refreshAvailableRoute = (
  config: ConversationReducerConfigurationType,
  draft: DigestedConversationType | undefined | null,
  events: EventOrchestraObjectType,
) => {
  if (!draft) {
    return;
  }
  const route = findAvailableRoutes(
    draft.name,
    draft.routes || [],
    events,
  ).shift();
  if (route && route.id !== draft.availableRoute?.id) {
    draft.availableRoute = route;
  }
  return draft;
};

const startRoute = (
  config: ConversationReducerConfigurationType,
  draft: DigestedConversationType | undefined,
  payload: {chosenOption: string},
) => {
  if (draft == null) {
    return draft;
  }
  const route = draft.routes.find(r => r.id === draft.availableRoute?.id);
  if (route == null) {
    return draft;
  }
  const path = route.routes[payload.chosenOption];
  const pendingMessages = convertToPathExchanges(path);
  const nextMessageContent = pendingMessages.shift();
  if (nextMessageContent == null) {
    return draft;
  }
  const offset = getListHeight(draft.exchanges);
  addNewTimeBlockToExchanges(config, draft, offset);
  const message = createSkBubbleFromMessage(
    {...config, ...{group: draft.group || false, positionAcc: offset + 30}},
    nextMessageContent.messageContent,
    nextMessageContent.name,
    nextMessageContent.tail,
  );
  message.messageDelay = 400;
  draft.exchanges.push(message);
  draft.activePath = pendingMessages;
  draft.chosenRoute = payload.chosenOption;
  draft.routeAtIndex = 1;
  draft.eventAction = {
    type: EVENTS_REDUCER_ACTIONS.MESSAGE_APP_ROUTE_CREATE,
    payload: {
      name: draft.name,
      chosen: draft.chosenRoute,
      routeId: route.id,
      atIndex: 1,
    },
  };
  return draft;
};

const addNewTimeBlockToExchanges = (
  config: ConversationReducerConfigurationType,
  draft: DigestedConversationType,
  offset: number,
) => {
  const timeItem = createTimeItem(
    {
      time: new Date().toISOString(),
      exchanges: [],
    },
    config.width,
    offset,
  );
  timeItem.messageDelay = 10;
  draft.exchanges.push(timeItem);
};

const addMessageFromBlock = (
  config: ConversationReducerConfigurationType,
  state: DigestedConversationType | undefined,
  block: ExchangeBlockType,
  index: number,
) => {
  if (state == null) {
    return state;
  }
  const newState = Object.assign({}, state);
  const offset = getListHeight(newState.exchanges);
  const itemConfiguration = Object.assign(config, {
    group: newState.group || false,
    positionAcc: offset,
  });
  const message = createSkBubbleFromExchange(itemConfiguration, block, index);
  message.messageDelay = message.messageDelay ||= 400;
  newState.exchanges.push(message);
  return newState;
};

const continueRoute = (
  config: ConversationReducerConfigurationType,
  draft: DigestedConversationType | undefined,
) => {
  if (draft?.activePath == null) {
    return draft;
  }
  if (draft.availableRoute == null) {
    return draft;
  }
  const nextMessage = draft.activePath[0];
  const offset = getListHeight(draft.exchanges);
  if (nextMessage == null) {
    draft.eventAction = {
      type: EVENTS_REDUCER_ACTIONS.MESSAGE_APP_ROUTE_UPDATE,
      payload: {
        routeId: draft.availableRoute.id,
        name: draft.name,
        finished: true,
      },
    };
    draft.nextMessageInQueue = undefined;
    draft.availableRoute = undefined;
    draft.routeAtIndex = undefined;
    draft.chosenRoute = undefined;

    return draft;
  }
  if (
    nextMessage?.name === CONTACT_NAMES.SELF &&
    draft.nextMessageInQueue == null
  ) {
    draft.nextMessageInQueue = convertMessageToString(
      nextMessage.messageContent,
    );
  } else {
    const message = createSkBubbleFromMessage(
      {...config, ...{group: draft.group || false, positionAcc: offset}},
      nextMessage.messageContent,
      nextMessage.name,
      nextMessage.tail,
    );
    message.messageDelay = message.messageDelay ||= 400;
    const previousMessage = draft.exchanges.slice(-1)[0];
    // previousMessage.messageDelay = undefined;
    // previousMessage.typingDelay = undefined;
    if (message.name === CONTACT_NAMES.SELF) {
      message.clip = BubblePath(message.width, message.height, 16, true);
      removePreviousTail(previousMessage);
    }
    draft.exchanges.push(message);
    draft.activePath.shift();
    draft.routeAtIndex = (draft.routeAtIndex || 0) + 1;
    draft.nextMessageInQueue = undefined;
    draft.eventAction = {
      type: EVENTS_REDUCER_ACTIONS.MESSAGE_APP_ROUTE_UPDATE,
      payload: {
        routeId: draft.availableRoute.id,
        name: draft.name,
        atIndex: draft.routeAtIndex,
      },
    };
  }
  return draft;
};

const removePreviousTail = (draftMessage: DigestedConversationListItem) => {
  if (draftMessage.type === MESSAGE_TYPE.TIME) {
    return;
  }
  if (draftMessage.name !== CONTACT_NAMES.SELF) {
    return;
  }
  draftMessage.clip = BubblePath(
    draftMessage.width,
    draftMessage.height,
    16,
    draftMessage.paddingBottom === 8,
  );
};

const addConversation = (
  config: ConversationReducerConfigurationType,
  draft: DigestedConversationType | undefined | null,
  conversation: DigestedConversationType,
) => {
  if (draft?.chosenRoute && draft?.nextMessageInQueue == null) {
    return draft;
  }
  conversation.exchanges.forEach(message => {
    message.typingDelay = undefined;
    message.messageDelay = undefined;
  });
  conversation.eventAction = {
    type: EVENTS_REDUCER_ACTIONS.MESSAGE_APP_CONVERSATION_SEEN,
    payload: {name: conversation.name},
  };
  return conversation;
};

const addMessage = (
  config: ConversationReducerConfigurationType,
  state: DigestedConversationType | undefined,
  payload: AddMessagePayloadType,
) => {
  if (state == null) {
    return state;
  }
  const {name, messageContent, tail} = payload;
  const newState = Object.assign({}, state);
  const offset = getListHeight(newState.exchanges);
  const itemConfiguration = Object.assign(config, {
    group: newState.group || false,
    positionAcc: offset,
  });
  const message = createSkBubbleFromMessage(
    itemConfiguration,
    messageContent,
    name,
    tail,
  );
  message.messageDelay = message.messageDelay ||= 400;
  newState.exchanges.push(message);
  return newState;
};

const updateMessage = (
  draft: DigestedConversationType | undefined,
  props: DigestedMessageProps,
  index: number,
) => {
  if (draft == null) {
    return draft;
  }
  draft.exchanges[index] = {...draft.exchanges[index], ...props};
  return draft;
};

export default createConversationReducer;
