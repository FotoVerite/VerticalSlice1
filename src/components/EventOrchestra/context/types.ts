import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {APP_NAMES} from 'components/apps/types';
import {PropsWithChildren, ReactNode} from 'react';

export type MessageAppContactsEventType = {
  [key in CONTACT_NAMES]: ContactEventType;
};

export type MessageRouteEventDataType = {
  date: Date;
  chosen: string;
  position: number;
};

export type MessageRouteEventType = {
  [routeId: string]: MessageRouteEventDataType;
};

export type ContactEventType = {
  views: Date[];
  routes: MessageRouteEventType;
};

export type MessageEventType = {
  [APP_NAMES.MESSAGE]: MessageAppContactsEventType;
};

export type EventOrchestraObjectType = MessageEventType;

export type EventOrchestraContextTypeDigest = {
  children: ReactNode;
};

export type EventOrchestraContextTypeDigested = PropsWithChildren<{
  events: {
    state: EventOrchestraObjectType;
    set: React.Dispatch<React.SetStateAction<EventOrchestraObjectType>>;
  };
}>;
