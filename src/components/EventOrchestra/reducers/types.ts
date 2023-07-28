import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {APP_NAMES} from 'components/apps/types';

export enum EVENTS_REDUCER_ACTIONS {
  MESSAGE_APP_CONVERSATION_SEEN,
  MESSAGE_APP_ROUTE_SEEN,
}

export type MessageAppContactsEventType = {
  [key in CONTACT_NAMES]: MessageAppEvents;
};

export type MessageRouteEventDataType = {
  date: Date;
  chosen?: string;
  position: number;
};

export type MessageRouteEventType = {
  [routeId: string]: MessageRouteEventDataType;
};

export type MessageAppEvents = {
  views: Date[];
  routes: MessageRouteEventType;
};

export type MessageEventType = {
  [APP_NAMES.MESSAGE]: MessageAppContactsEventType;
};

export type EventOrchestraObjectType = MessageEventType;

export type AddMessageAppConversationSeenEventAction = {
  type: EVENTS_REDUCER_ACTIONS.MESSAGE_APP_CONVERSATION_SEEN;
  payload: {name: CONTACT_NAMES};
};

export type AddMessageAppRouteSeenEventAction = {
  type: EVENTS_REDUCER_ACTIONS.MESSAGE_APP_ROUTE_SEEN;
  payload: {name: CONTACT_NAMES; routeId: number; chosen?: string};
};

export type EventsReducerActionsType =
  | AddMessageAppConversationSeenEventAction
  | AddMessageAppRouteSeenEventAction;
