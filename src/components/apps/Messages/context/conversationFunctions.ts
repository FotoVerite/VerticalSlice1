import moment from 'moment';
import {
  RouteObjectType,
  getLastSeenRoute,
  getUnfinishedRouteID,
} from '../reducers/conversationReducer/routing/seen';
import {
  ConversationType,
  EventBasedRouteType,
  ExchangeBlockType,
  MessageType,
} from './types';
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
import NotificationEmitter, {EMITTER_EVENTS} from 'emitter';
import {createSpamAccount, createSpamNotification} from './spamFactory';
import {interpolateColor} from 'react-native-reanimated';

export const sendNotification = async (
  conversation: ConversationType,
  events: MessageEventType,
  eventDispatch: (action: EventsReducerActionsType) => void,
  setSendNotifications: React.Dispatch<
    React.SetStateAction<SendNotificationType[]>
  >,
) => {
  findAvailableRoutes(
    conversation.name,
    conversation.eventBasedRoutes || [],
    events,
  ).forEach(route =>
    dispatchEvent(conversation, eventDispatch, setSendNotifications, route),
  );
};

const dispatchEvent = async (
  conversation: ConversationType,
  eventDispatch: (action: EventsReducerActionsType) => void,
  setSendNotifications: React.Dispatch<
    React.SetStateAction<SendNotificationType[]>
  >,
  route?: EventBasedRouteType,
) => {
  if (route == null) {
    return;
  }
  await delayFor(route?.delay || 0);
  const message = getLastMessageFromExchanges(route.exchanges);
  const notification = {
    active: true,
    backgroundColor: route.backgroundColor,
    title: `Message From ${conversation.name}`,
    content: convertMessageToString(message),
    timestamp: new Date(),
    image: conversation.heroImage,
    onPress: () =>
      NotificationEmitter.emit(EMITTER_EVENTS.NOTIFICATION, conversation.name),
  };
  eventDispatch({
    type: EVENTS_REDUCER_ACTIONS.MESSAGE_APP_ROUTE_CREATE,
    payload: {
      routeId: route.id,
      name: conversation.name,
      finished: true,
      notification: notification,
    },
  });
  setSendNotifications(arr => {
    return arr.concat({
      conversation: conversation,
      routeID: route.id.toString(),
      message: message,
    });
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
      case MESSAGE_TYPE.BACKGROUND_SNAPSHOT:
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

export const createSpam = () => {
  const spam4 = createSpamAccount();
  const startingNotification = ['Are you happy now?'].map((message, index) =>
    createSpamNotification(
      index,
      spam4.name,
      message,
      undefined,
      index * 1000 + 1000,
    ),
  );
  const messages = [
    "You're so worthless you know that",
    "I'd slit my own throat if I was you",
    'Kike',
    "I'd rape you if I could",
    'Faggot',
    'You never got people, you never got yourself, you never got anything',
    "You're a parasite, a rat, a cockroach",
    'Fucking die',
    'Everyone would be better off without you',
  ];
  const color = (size: number, index: number) =>
    interpolateColor(index, [0, size], ['#f2edee', '#db2121']);
  const notifications = startingNotification.concat(
    messages.map((message, index) => {
      const multiplier = index + 1;
      return createSpamNotification(
        index + 1,
        spam4.name,
        message,
        color(messages.length, index),
        multiplier * 2000 - multiplier * 100,
      );
    }),
  );
  spam4.eventBasedRoutes = notifications;
  return spam4;
};
