import React, {FC, useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import theme from 'themes';
import {NotificationsContext} from '../context';
import ActiveNotificationContainer from './ActiveNotificationContainer';

const ActiveNotifications: FC = () => {
  const notificationsContext = useContext(NotificationsContext);
  const notifications = notificationsContext.notifications.state;
  const [activeNotifications, setActiveNotifications] = useState(
    notifications.filter(notification => notification.active),
  );

  useEffect(() => {
    setActiveNotifications(
      notifications.filter(notification => notification.active),
    );
  }, [notifications]);

  return (
    <View pointerEvents="box-none" style={styles.screen}>
      {activeNotifications.map((notification, idx) => (
        <ActiveNotificationContainer
          key={`${idx}-notification`}
          notification={notification}
          dispatch={notificationsContext.notifications.dispatch}
          index={idx}
        />
      ))}
    </View>
  );
};

export default ActiveNotifications;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#6e6e6e52',
    position: 'absolute',
    zIndex: 102,
  },

  itemSeparator: {
    height: 10,
  },

  item: {
    borderRadius: 25,
    backgroundColor: '#ffffffc7',
    padding: theme.spacing.p1,
  },

  list: {
    paddingHorizontal: theme.spacing.p2,
    flexGrow: 1,
  },
});
