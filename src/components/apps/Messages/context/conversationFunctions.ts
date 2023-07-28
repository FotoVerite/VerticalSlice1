import {
  EventOrchestraObjectType,
  MessageEventType,
} from 'components/EventOrchestra/context/types';
import {
  NotificationsReducerActionsType,
  NOTIFICATIONS_REDUCER_ACTIONS,
} from 'components/Notifications/reducers/notificationsReducer/types';
import moment from 'moment';
import {
  RouteObjectType,
  getLastSeenRoute,
} from '../reducers/conversationReducer/routing/seen';
import {ConversationType, ExchangeBlockType, MessageType} from './types';
import {
  findAvailableRoutes,
  messageAppConditionsMet,
} from '../reducers/conversationReducer/routing/available';
import {delayFor, formatMoment} from 'common';
import {isMessageWithMeta} from './utility';
import {CONTACT_NAMES} from './usersMapping';
import {DigestedItemTypes} from '../reducers/conversationReducer/digestion/types';
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from '../reducers/conversationReducer/types';
import {
  EVENTS_REDUCER_ACTIONS,
  EventsReducerActionsType,
} from 'components/EventOrchestra/reducers/types';
export const sendNotification = async (
  conversation: ConversationType,
  events: MessageEventType,
  eventDispatch: (action: EventsReducerActionsType) => void,
  dispatch: React.Dispatch<NotificationsReducerActionsType>,
) => {
  let message: MessageType | undefined;

  const route = findAvailableRoutes(
    conversation.name,
    conversation.eventBasedRoutes || [],
    events,
  ).shift();
  await delayFor(route?.delay || 0);

  if (route) {
    eventDispatch({
      type: EVENTS_REDUCER_ACTIONS.MESSAGE_APP_ROUTE_SEEN,
      payload: {routeId: route.id, name: conversation.name},
    });
    message = getLastMessageFromExchanges(route.exchanges);
  } else if (conversation.exchanges.length > 0) {
    message = conversation.exchanges
      .slice(-1)[0]
      .exchanges.slice(-1)[0]
      .messages.slice(-1)[0];
  }
  if (message == null) {
    return;
  }

  dispatch({
    type: NOTIFICATIONS_REDUCER_ACTIONS.ADD,
    payload: {
      data: {
        active: true,
        title: `Message From ${conversation.name}`,
        content: convertMessageToString(message),
        timestamp: new Date(),
        image: conversation.heroImage,
        // onPress: () =>
        //   conversationDispatch({
        //     type: CONVERSATION_REDUCER_ACTIONS.DIGEST_CONVERSATION,
        //     payload: conversation,
        //   }),
      },
    },
  });
};

const determineTime = (
  conversation: ConversationType,
  routeEvent?: RouteObjectType,
) => {
  if (routeEvent == null) {
    const lastExchange = conversation.exchanges.slice(-1)[0];
    const date = moment(lastExchange.time);
    return date;
  } else {
    return moment(routeEvent.date);
  }
};

const hasExchanges = (
  conversation: ConversationType,
  routeEvent?: RouteObjectType,
) => {
  if (routeEvent == null) {
    return conversation.exchanges.length > 0;
  } else {
    return routeEvent.exchanges.length > 0;
  }
};
const getTime = (conversation: ConversationType, events: MessageEventType) =>
  determineTime(
    conversation,
    getLastSeenRoute(
      conversation.name,
      events,
      conversation.routes,
      conversation.eventBasedRoutes,
    ),
  );

export const conversationHasExchange = (
  conversation: ConversationType,
  events: MessageEventType,
) =>
  hasExchanges(
    conversation,
    getLastSeenRoute(
      conversation.name,
      events,
      conversation.routes,
      conversation.eventBasedRoutes,
    ),
  );

export const viewableConversations =
  (events: EventOrchestraObjectType) => (conversation: ConversationType) =>
    !conversation.conditions ||
    messageAppConditionsMet(events.Message, conversation.conditions);

export const sortConversations =
  (events: EventOrchestraObjectType) =>
  (c1: ConversationType, c2: ConversationType) => {
    const date1 = getTime(c1, events);
    const date2 = getTime(c2, events);
    if (date1 < date2) {
      return 1;
    }
    if (date1 > date2) {
      return -1;
    }
    return 0;
  };

export const determineLogLine = (
  conversation: ConversationType,
  routeEvent?: RouteObjectType,
): {time: string; content: string} => {
  if (routeEvent == null) {
    const lastExchange = conversation.exchanges.slice(-1)[0];
    const date = moment(lastExchange?.time || '');
    const message = getLastMessageFromExchanges(lastExchange.exchanges);
    return {
      time: formatMoment(date),
      content: convertMessageToString(message),
    };
  } else {
    const message = getLastMessageFromExchanges(routeEvent.exchanges);
    return {
      time: formatMoment(moment(routeEvent.date)),
      content: convertMessageToString(message),
    };
  }
};

const getLastMessageFromExchanges = (exchanges: ExchangeBlockType[]) => {
  const exchange = exchanges.slice(-1)[0];
  if (exchange == null) {
    return '';
  }
  const message = exchange.messages.slice(-1)[0];
  if (message == null) {
    return '';
  }
  return message;
};

const convertMessageToString = (message: MessageType) => {
  if (isMessageWithMeta(message)) {
    switch (message.type) {
      case DigestedItemTypes.NUMBER:
        return `${message.message.name}`;
      case DigestedItemTypes.SNAPSHOT:
        return message.message.filename;
      case DigestedItemTypes.VCARD:
        return `${message.message.name} Contact Card`;
      default:
        return message.message;
    }
  } else {
    return message;
  }
};
