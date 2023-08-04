import {
  DigestedConversationType,
  ExchangeBlockType,
  MessageRouteType,
} from '../../context/types';
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
  digestPath,
  getListHeight,
} from './digestion';
import {createTimeItem} from './digestion/TimeItem';
import {findAvailableRoutes} from './routing/available';
import {produce} from 'immer';
import {CONTACT_NAMES} from '../../context/usersMapping';
import {convertMessageToString} from '../../context/conversationFunctions';

const createConversationReducer =
  (config: ConversationReducerConfigurationType) =>
  (
    state: DigestedConversationType | undefined,
    action: ConversationReducerActionsType,
  ) =>
    conversationReducer(state, action, config);

const conversationReducer = produce(
  (
    draft: DigestedConversationType | undefined,
    action: ConversationReducerActionsType,
    config: ConversationReducerConfigurationType,
  ) => {
    switch (action.type) {
      case CONVERSATION_REDUCER_ACTIONS.ADD_CONVERSATION:
        return addConversation(config, action.payload);
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
      case CONVERSATION_REDUCER_ACTIONS.START_ROUTE:
        return startRoute(config, draft, action.payload);
      case CONVERSATION_REDUCER_ACTIONS.UPDATE_MESSAGE:
        return updateMessage(draft, action.payload.props, action.payload.index);
      case CONVERSATION_REDUCER_ACTIONS.RESET:
        return undefined;
      default:
        return draft;
    }
  },
);

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
  const pendingMessages = digestPath(path);
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
  draft.routeAtIndex = 1;
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
    return;
  }
  const nextMessage = draft.activePath[0];
  const offset = getListHeight(draft.exchanges);
  if (nextMessage == null) {
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
    draft.exchanges.push(message);
    draft.activePath.shift();
    draft.routeAtIndex = draft.routeAtIndex || 0 + 1;
    draft.nextMessageInQueue = undefined;
  }
  return draft;
  // if (state == null) {
  //   return state;
  // }
  // // const newState = updateMessage(
  // //   state,
  // //   {messageDelay: undefined},
  // //   state.exchanges.length - 1,
  // // );
  // const newState = Object.assign({}, state);
  // const activePath = [...newState.activePath];
  // const payload = activePath.shift();
  // if (payload == null) {
  //   newState.availableRoute = findAvailableRoutes(
  //     newState.name,
  //     newState.routes || [],
  //     config.events,
  //   )[0];
  //   return newState;
  // }
  // const offset = getListHeight(newState.exchanges);
  // const itemConfiguration = Object.assign(config, {
  //   group: newState.group || false,
  //   positionAcc: offset,
  // });
  // const message = createSkBubbleFromMessage(
  //   itemConfiguration,
  //   payload.messageContent,
  //   payload.name,
  //   payload.tail,
  // );
  // message.messageDelay = message.messageDelay ||= 400;
  // newState.activePath = activePath;
  // newState.exchanges = newState.exchanges.concat(message);
  // return newState;
};

const addConversation = (
  config: ConversationReducerConfigurationType,
  conversation: DigestedConversationType,
) => {
  // Remove any delays
  conversation.exchanges.forEach(message => {
    message.typingDelay = undefined;
    message.messageDelay = undefined;
  });
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
  state: DigestedConversationType | undefined,
  props: DigestedMessageProps,
  index: number,
) => {
  if (state == null) {
    return state;
  }
  const newState = Object.assign({}, state);
  newState.exchanges[index] = Object.assign(
    {},
    newState.exchanges[index],
    props,
  );
  return newState;
};

export default createConversationReducer;
