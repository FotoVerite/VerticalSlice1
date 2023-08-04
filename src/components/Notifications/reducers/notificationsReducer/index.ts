import {produce} from 'immer';
import {
  NOTIFICATIONS_REDUCER_ACTIONS,
  NotificationType,
  NotificationsReducerActionsType,
} from './types';

const notificationReducer = produce(
  (
    draft: NotificationType[],
    action: NotificationsReducerActionsType,
  ): NotificationType[] => {
    switch (action.type) {
      case NOTIFICATIONS_REDUCER_ACTIONS.ADD:
        action.payload.data.timestamp ||= new Date();
        const notification = Object.assign(action.payload.data, {
          index: draft.length,
        });
        draft.push(notification);
        return draft;
      case NOTIFICATIONS_REDUCER_ACTIONS.UPDATE:
        draft[action.payload.index] = {
          ...draft[action.payload.index],
          ...action.payload,
        };
        return draft;
      case NOTIFICATIONS_REDUCER_ACTIONS.DELETE:
        return draft.splice(action.payload.index, 1);
      case NOTIFICATIONS_REDUCER_ACTIONS.RESET:
        return <NotificationType[]>[];
      default:
        return draft;
    }
  },
);

export default notificationReducer;
