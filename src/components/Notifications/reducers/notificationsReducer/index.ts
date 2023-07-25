import {
  NOTIFICATIONS_REDUCER_ACTIONS,
  NotificationType,
  NotificationsReducerActionsType,
} from './types';

const notificationReducer = (
  state: NotificationType[],
  action: NotificationsReducerActionsType,
): NotificationType[] => {
  let newState: NotificationType[];
  switch (action.type) {
    case NOTIFICATIONS_REDUCER_ACTIONS.ADD:
      action.payload.data.timestamp ||= new Date();
      const notification = Object.assign(action.payload.data, {
        index: state.length,
      });
      return Object.assign([...state, notification]);
    case NOTIFICATIONS_REDUCER_ACTIONS.UPDATE:
      newState = Object.assign([...state], <NotificationType[]>[]);
      newState[action.payload.index] = Object.assign(
        {},
        newState[action.payload.index],
        action.payload.data,
      );
      return newState;
    case NOTIFICATIONS_REDUCER_ACTIONS.DELETE:
      newState = Object.assign([...state], <NotificationType[]>[]);
      newState.splice(action.payload.index, 1);
      return newState;
    case NOTIFICATIONS_REDUCER_ACTIONS.RESET:
      return <NotificationType[]>[];
    default:
      return state;
  }
};

export default notificationReducer;
