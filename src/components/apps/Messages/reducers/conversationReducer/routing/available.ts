import {
  EventOrchestraObjectType,
  MessageAppContactsEventType,
  MessageRouteEventDataType,
} from 'components/EventOrchestra/reducers/types';
import {
  RouteConditionsType,
  MessageRouteType,
  EventBasedRouteType,
} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';

const contactHasBeenViewedCheck = (
  name: CONTACT_NAMES,
  messageEvents: MessageAppContactsEventType,
  conditions: RouteConditionsType,
) => {
  const viewCondition = conditions[name]?.views;
  if (viewCondition == null) {
    return true;
  }
  const viewedAmount = messageEvents[name]?.views.length || 0;
  return viewCondition <= viewedAmount;
};

const routeChosenSelected = (
  chosen?: string[],
  viewed?: MessageRouteEventDataType,
) => {
  if (chosen == null || viewed == null) {
    return true;
  }
  return chosen.includes(viewed.chosen);
};

const routeNotChosenSelected = (
  not_chosen?: string[],
  viewed?: MessageRouteEventDataType,
) => {
  if (not_chosen == null || viewed == null) {
    return true;
  }
  return !not_chosen.includes(viewed.chosen);
};

const routeHasBeenChosenCheck = (
  name: CONTACT_NAMES,
  messageEvents: MessageAppContactsEventType,
  conditions: RouteConditionsType,
) => {
  const routeConditions = conditions[name]?.routes || {};
  const routeConditionsKeys = Object.keys(routeConditions);
  if (routeConditionsKeys.length === 0) {
    return true;
  }
  const viewedRoutes = messageEvents[name]?.routes || {};
  return routeConditionsKeys.reduce((acc, key) => {
    const routeCondition = routeConditions[key] || [];
    return (
      acc &&
      viewedRoutes[key] != null &&
      routeChosenSelected(routeCondition.chosen, viewedRoutes[key]) &&
      routeNotChosenSelected(routeCondition.not_chosen, viewedRoutes[key])
    );
  }, true);
};

export const messageAppConditionsMet = (
  state: MessageAppContactsEventType,
  conditions?: RouteConditionsType,
) => {
  let ret = true;
  if (conditions == null) {
    return ret;
  }
  Object.keys(conditions).forEach((key: string) => {
    ret =
      ret && contactHasBeenViewedCheck(key as CONTACT_NAMES, state, conditions);
    ret =
      ret && routeHasBeenChosenCheck(key as CONTACT_NAMES, state, conditions);
  });
  return ret;
};

export const findAvailableRoutes = <
  AvailableRouteType extends EventBasedRouteType | MessageRouteType,
>(
  name: CONTACT_NAMES,
  routes: AvailableRouteType[],
  state: EventOrchestraObjectType,
) => {
  if (routes == null || routes.length === 0) {
    return [] as AvailableRouteType[];
  } else {
    return routes.filter(route => {
      // Convert number to string due to objects keys needing to be strings
      const finishedRoutes = Object.keys(
        state.Message[name]?.routes || {},
      ).filter(key => state.Message[name].routes[key].finished);
      return (
        !finishedRoutes.includes(route.id.toString()) &&
        (route.conditions == null ||
          messageAppConditionsMet(state.Message, route.conditions))
      );
    }) as AvailableRouteType[];
  }
};
