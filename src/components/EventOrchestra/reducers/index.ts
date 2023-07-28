import {
  EVENTS_REDUCER_ACTIONS,
  EventOrchestraObjectType,
  EventsReducerActionsType,
} from './types';

const eventsReducer = (
  state: EventOrchestraObjectType,
  action: EventsReducerActionsType,
): EventOrchestraObjectType => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case EVENTS_REDUCER_ACTIONS.MESSAGE_APP_CONVERSATION_SEEN:
      newState.Message[action.payload.name].views.push(new Date());
      return newState;
    case EVENTS_REDUCER_ACTIONS.MESSAGE_APP_ROUTE_SEEN:
      const {routeId, chosen} = action.payload;
      const routeInfo = newState.Message[action.payload.name].routes;
      const position = Object.keys(routeInfo).length + 1;
      routeInfo[routeId.toString()] = {
        date: new Date(),
        chosen: chosen,
        position: position,
      };
      return newState;
    default:
      return state;
  }
};

export default eventsReducer;
