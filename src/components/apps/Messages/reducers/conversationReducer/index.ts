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

const createConversationReducer =
  (config: ConversationReducerConfigurationType) =>
  (
    state: DigestedConversationType | undefined,
    action: ConversationReducerActionsType,
  ) =>
    conversationReducer(state, action, config);

const conversationReducer = (
  state: DigestedConversationType | undefined,
  action: ConversationReducerActionsType,
  config: ConversationReducerConfigurationType,
) => {
  switch (action.type) {
    case CONVERSATION_REDUCER_ACTIONS.ADD_CONVERSATION:
      return addConversation(config, action.payload);
    case CONVERSATION_REDUCER_ACTIONS.ADD_MESSAGE_FROM_BLOCK:
      return addMessageFromBlock(
        config,
        state,
        action.payload.block,
        action.payload.index,
      );
    case CONVERSATION_REDUCER_ACTIONS.ADD_MESSAGE:
      return addMessage(config, state, action.payload);
    case CONVERSATION_REDUCER_ACTIONS.CONTINUE_ROUTE:
      return continueRoute(config, state);
    case CONVERSATION_REDUCER_ACTIONS.START_ROUTE:
      return startRoute(config, state, action.payload);
    case CONVERSATION_REDUCER_ACTIONS.UPDATE_MESSAGE:
      return updateMessage(state, action.payload.props, action.payload.index);
    case CONVERSATION_REDUCER_ACTIONS.RESET:
      return undefined;
    default:
      return state;
  }
};

const startRoute = (
  config: ConversationReducerConfigurationType,
  state: DigestedConversationType | undefined,
  payload: {id: number; chosenOption: string},
) => {
  if (state == null) {
    return state;
  }
  const newState = Object.assign({}, state);
  const offset = getListHeight(newState.exchanges);

  const timeItem = createTimeItem(
    {
      time: new Date().toISOString(),
      exchanges: [],
    },
    config.width,
    offset,
  );
  timeItem.messageDelay = 10;
  newState.exchanges = [...newState.exchanges, timeItem];
  const route = newState.routes.find(r => r.id === payload.id);
  if (route == null) {
    return state;
  }
  const path = route.routes[payload.chosenOption];
  newState.activePath = digestPath(path);
  return newState;
};

const continueRoute = (
  config: ConversationReducerConfigurationType,
  state: DigestedConversationType | undefined,
) => {
  if (state == null) {
    return state;
  }
  // const newState = updateMessage(
  //   state,
  //   {messageDelay: undefined},
  //   state.exchanges.length - 1,
  // );
  const newState = Object.assign({}, state);
  const activePath = [...newState.activePath];

  const payload = activePath.shift();

  if (payload == null) {
    newState.availableRoute = findAvailableRoutes(
      newState.name,
      newState.routes || [],
      config.events,
    )[0];
    return newState;
  }
  const offset = getListHeight(newState.exchanges);
  const itemConfiguration = Object.assign(config, {
    group: newState.group || false,
    positionAcc: offset,
  });
  const message = createSkBubbleFromMessage(
    itemConfiguration,
    payload.messageContent,
    payload.name,
    payload.tail,
  );
  message.messageDelay = message.messageDelay ||= 400;
  newState.activePath = activePath;
  newState.exchanges = newState.exchanges.concat(message);
  return newState;
};

const addConversation = (
  config: ConversationReducerConfigurationType,
  conversation: DigestedConversationType,
) => {
  return conversation;
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
