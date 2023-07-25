import React, {FC, useContext} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HexContext} from '../context';

import {showTheNotification} from '../controller';

import theme from 'themes';
import {P} from 'components/common/StyledText';

const Notification: FC = () => {
  const {width} = useWindowDimensions();
  const context = useContext(HexContext);
  const insets = useSafeAreaInsets();
  const showNotification = useSharedValue(0);

  const animateNotificationLeft = useAnimatedStyle(() => {
    return {
      left: interpolate(showNotification.value, [0, 1], [width, 30]),
    };
  });

  if (context.notification.state != '') {
    showTheNotification(context, showNotification);
  }

  const styles = StyleSheet.create({
    notification: {
      zIndex: 15,
      top: insets.top + 30,
      position: 'absolute',
      width: width - 60,
      flex: 0,
      flexGrow: 0,
      minHeight: 70,
      borderRadius: theme.BorderRadius.small,
      borderLeftWidth: 1,
      borderColor: 'white',
      backgroundColor: '#a19898',
    },
    notificationText: {
      flexGrow: 1,
      justifyContent: 'center',
      alignSelf: 'center',
    },
  });

  return (
    <Animated.View style={[styles.notification, animateNotificationLeft]}>
      <View style={styles.notificationText}>
        <P size="m">{context.notification.state}</P>
      </View>
    </Animated.View>
  );
};

export default Notification;
