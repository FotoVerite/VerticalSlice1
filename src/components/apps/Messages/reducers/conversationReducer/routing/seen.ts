import {
  MessageRouteEventType,
  MessageEventType,
  MessageRouteEventDataType,
} from 'components/EventOrchestra/reducers/types';
import {
  EventBasedRouteType,
  ExchangeBlockType,
  MessageRouteType,
  MessageWithMetaType,
} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {EFFECT_TYPE} from '../digestion/types';
import {messageAppConditionsMet} from './available';

export type SeenRouteType = {
  [index: string]: {[key: string]: ExchangeBlockType[]};
};

export type RouteObjectType = {
  routeId: string;
  exchanges: ExchangeBlockType[];
} & MessageRouteEventDataType;

export const isMessageWithMeta = (
  message: MessageWithMetaType | string,
): message is MessageWithMetaType => {
  return (message as MessageWithMetaType).type !== undefined;
};

const constructAvailableRouteObject = (
  events: MessageEventType,
  availableRoutes: MessageRouteType[],
) => {
  const routes: SeenRouteType = {};
  availableRoutes.forEach(route => {
    routes[route.id] = route.routes;
    const FullReplacement = route.effects?.filter(
      effect => effect.type === EFFECT_TYPE.FULL_REPLACEMENT,
    )[0];
    if (
      FullReplacement &&
      messageAppConditionsMet(events.Message, FullReplacement.conditions)
    ) {
      routes[route.id] = FullReplacement.data;
    }
  });
  return routes;
};

const constructSeenRoutes = (
  routeEvents: MessageRouteEventType,
  availableRoutes: SeenRouteType,
) => {
  const ret: RouteObjectType[] = [];
  for (const [key, value] of Object.entries(routeEvents)) {
    if (availableRoutes[key] == null || !value.finished) {
      continue;
    }
    ret.push(
      Object.assign(
        {},
        {routeId: key},
        {...value},
        {exchanges: availableRoutes[key][value.chosen!]},
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
    constructAvailableRouteObject(events, availableRoutes),
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
  const routes = getSeenOptionRoutes(name, events, availableRoutes)
    .concat(getSeenEventRoutes(name, events, availableEventBasedRoutes))
    .sort((a, b) => a.position - b.position);
  return routes;
};

export const getUnfinishedRouteID = (
  name: CONTACT_NAMES,
  events: MessageEventType,
  availableRoutes?: MessageRouteType[],
) => {
  const unfinishedRouteID = Object.keys(events.Message[name]?.routes || {})
    .filter(key => !events.Message[name].routes[key].finished)
    .shift();
  if (!unfinishedRouteID || !availableRoutes) {
    return undefined;
  }
  return unfinishedRouteID;
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
