import {produce} from 'immer';
import {
  EVENTS_REDUCER_ACTIONS,
  EventOrchestraObjectType,
  EventsReducerActionsType,
} from './types';

const eventsReducer = produce(
  (
    draft: EventOrchestraObjectType,
    action: EventsReducerActionsType,
  ): EventOrchestraObjectType => {
    switch (action.type) {
      case EVENTS_REDUCER_ACTIONS.MESSAGE_APP_CONVERSATION_SEEN:
        draft.Message[action.payload.name].views.push(new Date());
        return draft;
      case EVENTS_REDUCER_ACTIONS.MESSAGE_APP_CONVERSATION_BLOCK:
        draft.Message[action.payload.name].blocked = true;
        return draft;
      case EVENTS_REDUCER_ACTIONS.MESSAGE_APP_ROUTE_CREATE: {
        const {routeId, ...props} = action.payload;
        const routeInfo = draft.Message[action.payload.name].routes;
        const position = Object.keys(routeInfo).length + 1;
        routeInfo[routeId.toString()] = {
          createdAt: new Date(),
          updatedAt: new Date(),
          position: position,
          ...props,
        };
        console.log('MESSAGE_APP_ROUTE_CREATE', routeInfo[routeId.toString()]);
        return draft;
      }
      case EVENTS_REDUCER_ACTIONS.MESSAGE_APP_ROUTE_UPDATE: {
        const {routeId, ...props} = action.payload;
        const routeInfo = draft.Message[action.payload.name].routes;
        const copy = {...routeInfo[routeId.toString()]};
        routeInfo[routeId.toString()] = {
          ...routeInfo[routeId.toString()],
          ...props,
          ...{updatedAt: new Date()},
        };
        console.log(
          'MESSAGE_APP_ROUTE_UPDATED',
          copy,
          routeInfo[routeId.toString()],
        );
        return draft;
      }
      default:
        return draft;
    }
  },
);

export default eventsReducer;
