import moment from 'moment';
import {
  RouteObjectType,
  getLastSeenRoute,
  getUnfinishedRouteID,
} from '../reducers/conversationReducer/routing/seen';
import {ConversationType, ExchangeBlockType, MessageType} from './types';
import {
  findAvailableRoutes,
  messageAppConditionsMet,
} from '../reducers/conversationReducer/routing/available';
import {delayFor, formatMoment} from 'common';
import {isMessageWithMeta} from './utility';
import {MESSAGE_TYPE} from '../reducers/conversationReducer/digestion/types';

import {
  EVENTS_REDUCER_ACTIONS,
  EventOrchestraObjectType,
  EventsReducerActionsType,
  MessageEventType,
} from 'components/EventOrchestra/reducers/types';
import {convertToPathExchanges} from '../reducers/conversationReducer/digestion';
import {SendNotificationType} from '.';

export const sendNotification = async (
  conversation: ConversationType,
  events: MessageEventType,
  eventDispatch: (action: EventsReducerActionsType) => void,
  setSendNotifications: React.Dispatch<
    React.SetStateAction<SendNotificationType[]>
  >,
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
      type: EVENTS_REDUCER_ACTIONS.MESSAGE_APP_ROUTE_CREATE,
      payload: {routeId: route.id, name: conversation.name, finished: true},
    });
    message = getLastMessageFromExchanges(route.exchanges);
    setSendNotifications(arr => {
      return arr.concat({
        conversation: conversation,
        routeID: route.id,
        message: message,
      });
    });
  } else if (conversation.exchanges.length > 0) {
    message = conversation.exchanges
      .slice(-1)[0]
      .exchanges.slice(-1)[0]
      .messages.slice(-1)[0];
  }
  if (message == null) {
    return;
  }
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
    return moment(routeEvent.updatedAt);
  }
};

const getTime = (conversation: ConversationType, events: MessageEventType) => {
  const unfinishedID = getUnfinishedRouteID(
    conversation.name,
    events,
    conversation.routes,
  );
  if (unfinishedID != null) {
    const [updatedAt] = digestPathFromUnfinishedID(
      unfinishedID,
      conversation,
      events,
    );
    return moment(updatedAt);
  } else {
    return determineTime(
      conversation,
      getLastSeenRoute(
        conversation.name,
        events,
        conversation.routes,
        conversation.eventBasedRoutes,
      ),
    );
  }
};

export const conversationHasExchange = (
  conversation: ConversationType,
  events: MessageEventType,
) =>
  conversation.exchanges.length > 0 ||
  Object.keys(events.Message[conversation.name].routes).length > 0;

export const viewableConversations =
  (events: EventOrchestraObjectType) => (conversation: ConversationType) =>
    !conversation.blocked &&
    (!conversation.conditions ||
      messageAppConditionsMet(events.Message, conversation.conditions));

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
  events: EventOrchestraObjectType,
): {time: string; content: string} => {
  const routeEvent = getLastSeenRoute(
    conversation.name,
    events,
    conversation.routes,
    conversation.eventBasedRoutes,
  );
  const unfinishedID = getUnfinishedRouteID(
    conversation.name,
    events,
    conversation.routes,
  );
  if (unfinishedID != null) {
    const [updatedAt, _, seen] = digestPathFromUnfinishedID(
      unfinishedID,
      conversation,
      events,
    );
    if (seen && seen.length > 0) {
      const lastExchange = seen.pop()!;
      return {
        time: formatMoment(moment(updatedAt)),
        content: convertMessageToString(lastExchange.messageContent),
      };
    }
  }
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
      time: formatMoment(moment(routeEvent.updatedAt)),
      content: convertMessageToString(message),
    };
  }
};

export const digestPathFromUnfinishedID = (
  ID: string,
  conversation: ConversationType,
  events: EventOrchestraObjectType,
) => {
  const event = events.Message[conversation.name].routes[ID];
  const route = conversation.routes?.find(r => r.id.toString() === ID);
  if (event && route && event.chosen && event.atIndex) {
    const path = convertToPathExchanges(route.routes[event.chosen]);
    const seen = path.splice(0, event.atIndex);
    return [event.updatedAt, event.chosen, seen, path] as const;
  } else {
    return [undefined, undefined, undefined, undefined] as const;
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

export const convertMessageToString = (message: MessageType) => {
  if (isMessageWithMeta(message)) {
    switch (message.type) {
      case MESSAGE_TYPE.IMAGE:
        return 'Attachment 1: Image';
      case MESSAGE_TYPE.NUMBER:
        return `${message.message.name}`;
      case MESSAGE_TYPE.SNAPSHOT:
        return 'Send Snapshot';
      case MESSAGE_TYPE.VCARD:
        return `${message.message.name} Contact Card`;
      default:
        return message.message;
    }
  } else {
    return message;
  }
};
