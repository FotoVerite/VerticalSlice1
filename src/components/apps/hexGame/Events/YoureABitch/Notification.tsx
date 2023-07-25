import React, {FC, useEffect} from 'react';
import {StyleSheet, ViewStyle, useWindowDimensions} from 'react-native';

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import theme from 'themes';
import {P} from 'components/common/StyledText';

export type HorrorNotificationType = {
  delay: number;
  speed: number;
  text: string;
  containerStyle: ViewStyle;
};
const Notification: FC<HorrorNotificationType> = ({
  delay,
  speed,
  text,
  containerStyle,
}) => {
  const {width} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const showNotification = useSharedValue(0);

  const animateNotificationLeft = useAnimatedStyle(() => {
    return {
      left: interpolate(showNotification.value, [0, 1], [width, 30]),
    };
  });

  useEffect(() => {
    showNotification.value = withDelay(
      delay,
      withTiming(1, {duration: speed || 500}),
    );
  }, [showNotification, delay, speed]);

  const styles = StyleSheet.create({
    notification: {
      top: insets.top + 30,
      position: 'absolute',
      width: width - 60,
      flex: 0,
      flexGrow: 0,
      minHeight: 70,
      borderRadius: theme.BorderRadius.small,
      borderLeftWidth: 1,
      borderColor: 'white',
      backgroundColor: '#868686',
      justifyContent: 'center',
      alignItems: 'center',
    },
    notificationText: {letterSpacing: 10},
  });

  return (
    <Animated.View
      style={[styles.notification, containerStyle, animateNotificationLeft]}>
      <P size="m" style={styles.notificationText}>
        {text}
      </P>
    </Animated.View>
  );
};

export default Notification;
