import {NotificationDataType} from 'components/Notifications/reducers/notificationsReducer/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {APP_NAMES} from 'components/apps/types';

export enum EVENTS_REDUCER_ACTIONS {
  MESSAGE_APP_CONVERSATION_SEEN,
  MESSAGE_APP_CONVERSATION_BLOCK,
  MESSAGE_APP_ROUTE_CREATE,
  MESSAGE_APP_ROUTE_UPDATE,
}

export type MessageAppContactsEventType = {
  [key in CONTACT_NAMES]: MessageAppEvents;
};

export type MessageRouteEventDataType = {
  createdAt: Date;
  updatedAt: Date;
  chosen?: string;
  position: number;
  atIndex?: number;
  finished?: boolean;
};

export type MessageRouteEventType = {
  [routeId: string]: MessageRouteEventDataType;
};

export type MessageAppEvents = {
  views: Date[];
  routes: MessageRouteEventType;
  blocked: boolean;
};

export type MessageEventType = {
  ['NOTIFICATIONS']: NotificationDataType[];
  [APP_NAMES.MESSAGE]: MessageAppContactsEventType;
};

export type EventOrchestraObjectType = MessageEventType;

export type AddMessageAppConversationSeenEventAction = {
  type: EVENTS_REDUCER_ACTIONS.MESSAGE_APP_CONVERSATION_SEEN;
  payload: {name: CONTACT_NAMES; notification?: NotificationDataType};
};
export type BlockMessageAppConversationEventAction = {
  type: EVENTS_REDUCER_ACTIONS.MESSAGE_APP_CONVERSATION_BLOCK;
  payload: {name: CONTACT_NAMES};
};

export type CreateMessageAppRouteEventAction = {
  type: EVENTS_REDUCER_ACTIONS.MESSAGE_APP_ROUTE_CREATE;
  payload: {
    name: CONTACT_NAMES;
    routeId: number;
    chosen?: string;
    finished?: boolean;
    atIndex?: number;
    notification?: NotificationDataType;
  };
};

export type UpdateMessageAppRouteEventAction = {
  type: EVENTS_REDUCER_ACTIONS.MESSAGE_APP_ROUTE_UPDATE;
  payload: {
    name: CONTACT_NAMES;
    routeId: number;
    finished?: boolean;
    atIndex?: number;
  };
};

export type EventsReducerActionsType =
  | AddMessageAppConversationSeenEventAction
  | BlockMessageAppConversationEventAction
  | CreateMessageAppRouteEventAction
  | UpdateMessageAppRouteEventAction;
