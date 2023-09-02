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
  let ret = true;
  if (viewCondition.lt) {
    ret = ret && viewedAmount < viewCondition.lt;
  }
  if (viewCondition.lte) {
    ret = ret && viewedAmount <= viewCondition.lte;
  }
  if (viewCondition.gt) {
    ret = ret && viewedAmount > viewCondition.gt;
  }
  if (viewCondition.gte) {
    ret = ret && viewedAmount >= viewCondition.gte;
  }
  return ret;
};

const routeChosenSelected = (
  chosen?: string[],
  viewed?: MessageRouteEventDataType,
) => {
  if (!viewed || !viewed.chosen) {
    return false;
  }

  if (chosen == null) {
    return true;
  }
  return chosen.includes(viewed.chosen);
};

const routeNotChosenSelected = (
  not_chosen?: string[],
  viewed?: MessageRouteEventDataType,
) => {
  if (!viewed || !viewed.chosen) {
    return false;
  }

  if (not_chosen == null) {
    return true;
  }
  return !not_chosen.includes(viewed.chosen);
};

const routeFinished = (
  finished?: boolean,
  viewed?: MessageRouteEventDataType,
) => {
  if (!viewed) {
    return false;
  }

  if (finished == null) {
    return true;
  }
  return finished == viewed.finished;
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
      routeFinished(routeCondition.finished, viewedRoutes[key]) &&
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
