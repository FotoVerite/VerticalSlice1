import React, {FC, useContext} from 'react';
import {
  ListRenderItem,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {SharedValue, useAnimatedRef} from 'react-native-reanimated';

import theme from 'themes';
import {NotificationsContext} from '../context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Notification from '../Notification';
import {NotificationType} from '../reducers/notificationsReducer/types';
import {P} from 'components/common/StyledText';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#bebebe52',
    position: 'absolute',
    zIndex: 100,
  },
  title: {
    paddingVertical: theme.spacing.p1,
    marginStart: theme.spacing.p1 / 2,
  },

  itemSeparator: {
    height: 10,
  },

  list: {
    paddingHorizontal: theme.spacing.p2,
    flexGrow: 1,
  },
});

function Separator() {
  return <View style={styles.itemSeparator} />;
}

const renderItem: ListRenderItem<NotificationType> = ({item}) => (
  <Notification notification={item} />
);

const HEADER = (
  <P size={'m'} style={styles.title}>
    Notification Center
  </P>
);

const NotificationsList: FC<{left: SharedValue<number>}> = ({left}) => {
  const notificationsContext = useContext(NotificationsContext);
  const aref = useAnimatedRef<Animated.FlatList<any>>();

  const {width, height} = useWindowDimensions();
  const inset = useSafeAreaInsets();

  return (
    <Animated.View
      style={[
        styles.screen,
        {width: width, height: height, left: width},
        {left: left},
      ]}>
      <View style={[styles.list, {marginTop: inset.top}]}>
        <Animated.FlatList
          ref={aref}
          data={notificationsContext.notifications.state}
          renderItem={renderItem}
          ListHeaderComponent={HEADER}
          ItemSeparatorComponent={Separator}
          keyExtractor={(item: any, index) => index + '-notification'}
          scrollEventThrottle={16}
        />
      </View>
    </Animated.View>
  );
};

export default NotificationsList;
