import {
  MessageRouteEventType,
  MessageEventType,
} from 'components/EventOrchestra/context/types';
import {
  EventBasedRouteType,
  ExchangeBlockType,
  MessageRouteType,
  MessageWithMetaType,
} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';

export type SeenRouteType = {
  [index: string]: {[key: string]: ExchangeBlockType[]};
};

export type RouteObjectType = {
  routeId: string;
  chosen: string;
  date: Date;
  exchanges: ExchangeBlockType[];
  position: number;
};

export const isMessageWithMeta = (
  message: MessageWithMetaType | string,
): message is MessageWithMetaType => {
  return (message as MessageWithMetaType).type !== undefined;
};

const constructAvailableRouteObject = (availableRoutes: MessageRouteType[]) => {
  const routes: SeenRouteType = {};
  availableRoutes.forEach(route => (routes[route.id] = route.routes));
  return routes;
};

const constructSeenRoutes = (
  routeEvents: MessageRouteEventType,
  availableRoutes: SeenRouteType,
) => {
  const ret: RouteObjectType[] = [];
  for (const [key, value] of Object.entries(routeEvents)) {
    if (availableRoutes[key] == null) {
      continue;
    }
    ret.push(
      Object.assign(
        {},
        {routeId: key},
        {...value},
        {exchanges: availableRoutes[key][value.chosen]},
      ),
    );
  }
  ret.sort((a, b) => a.position - b.position);
  return ret;
};

const constructSeenEventRoutes = (
  routeEvents: MessageRouteEventType,
  availableRoutes: EventBasedRouteType[],
) => {
  const ret: RouteObjectType[] = [];
  for (const [key, value] of Object.entries(routeEvents)) {
    const event = availableRoutes.find(a => a.id.toString() === key);
    if (event == null) {
      continue;
    }
    ret.push(
      Object.assign(
        {},
        {routeId: key},
        {...value},
        {exchanges: event.exchanges},
      ),
    );
  }
  ret.sort((a, b) => a.position - b.position);
  return ret;
};

export const getSeenOptionRoutes = (
  name: CONTACT_NAMES,
  events: MessageEventType,
  availableRoutes?: MessageRouteType[],
) => {
  if (!availableRoutes) {
    return [];
  }
  const routeEvents = events.Message[name]?.routes || {};

  return constructSeenRoutes(
    routeEvents,
    constructAvailableRouteObject(availableRoutes),
  );
};

export const getSeenEventRoutes = (
  name: CONTACT_NAMES,
  events: MessageEventType,
  availableRoutes?: EventBasedRouteType[],
) => {
  if (!availableRoutes) {
    return [];
  }
  const routeEvents = events.Message[name]?.routes || {};

  return constructSeenEventRoutes(routeEvents, availableRoutes);
};

export const getSeenRoutes = (
  name: CONTACT_NAMES,
  events: MessageEventType,
  availableRoutes?: MessageRouteType[],
  availableEventBasedRoutes?: EventBasedRouteType[],
) => {
  const routes = getSeenOptionRoutes(name, events, availableRoutes).concat(
    getSeenEventRoutes(name, events, availableEventBasedRoutes).sort(
      (a, b) => a.position - b.position,
    ),
  );
  return routes;
};

export const getLastSeenRoute = (
  name: CONTACT_NAMES,
  events: MessageEventType,
  availableRoutes?: MessageRouteType[],
  availableEventBasedRoutes?: EventBasedRouteType[],
): RouteObjectType | undefined => {
  return getSeenRoutes(
    name,
    events,
    availableRoutes,
    availableEventBasedRoutes,
  ).slice(-1)[0];
};
