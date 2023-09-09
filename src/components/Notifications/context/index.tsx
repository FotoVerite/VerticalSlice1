import React, {FC, useContext, useEffect, useReducer} from 'react';
import {
  NotificationsContextTypeDigested,
  NotificationsContextTypeDigest,
} from './types';
import zolaAvatar from '@apps/Messages/assets/avatars/Zara.jpg';
import notificationReducer from '../reducers/notificationsReducer';
import {EventOrchestraContext} from 'components/EventOrchestra/context';
import {NOTIFICATIONS_REDUCER_ACTIONS} from '../reducers/notificationsReducer/types';

//defaults for empty app
export const NotificationsContext =
  React.createContext<NotificationsContextTypeDigested>({});

const NotificationsContextProvider: FC<
  NotificationsContextTypeDigest
> = props => {
  const events = useContext(EventOrchestraContext);
  const EVENT_NOTIFICATIONS = events.events.state.NOTIFICATIONS;
  const [notifications, dispatchNotifications] = useReducer(
    notificationReducer,
    [],
  );

  useEffect(() => {
    const filteredBy = notifications.map(n => n.timestamp);
    const filtered = EVENT_NOTIFICATIONS.filter(
      e => !filteredBy.includes(e.timestamp),
    );
    filtered.forEach(n =>
      dispatchNotifications({
        type: NOTIFICATIONS_REDUCER_ACTIONS.ADD,
        payload: {data: n},
      }),
    );
  }, [EVENT_NOTIFICATIONS, notifications]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications: {state: notifications, dispatch: dispatchNotifications},
      }}>
      {props.children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContextProvider;
export const NotificationsContextConsumer = NotificationsContext.Consumer;
