import React, {FC, useReducer} from 'react';
import {
  NotificationsContextTypeDigested,
  NotificationsContextTypeDigest,
} from './types';
import zolaAvatar from '@apps/Messages/assets/avatars/Zara.jpg';
import notificationReducer from '../reducers/notificationsReducer';

//defaults for empty app
export const NotificationsContext =
  React.createContext<NotificationsContextTypeDigested>({});

// const notification1 = {
//   title: 'title',
//   content: 'Hello this is a notification',
//   active: true,
//   timestamp: new Date(),
//   image: zolaAvatar,
//   index: 1,
// };
// const notification2 = {
//   title: 'title',
//   content: 'Hello this is a notification',
//   active: true,
//   timestamp: new Date(),
//   image: zolaAvatar,
//   index: 2,
// };

const NotificationsContextProvider: FC<
  NotificationsContextTypeDigest
> = props => {
  const [notifications, dispatchNotifications] = useReducer(
    notificationReducer,
    [],
  );

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
