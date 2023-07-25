import {Blur, Canvas, Image} from '@shopify/react-native-skia';
import React, {FC, PropsWithChildren, useContext, useRef} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import NotificationsList from './List';
import {
  interpolate,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SnapShotContext} from 'components/Snapshot/context';
import NotificationsContextProvider from './context';
import ActiveNotifications from './ActiveNotifications';
import {APP_WIDE_Z_INDEX_LEVELS} from 'common/types';

const Notifications: FC<PropsWithChildren> = ({children}) => {
  const snapshotContext = useContext(SnapShotContext);
  const {width, height} = useWindowDimensions();
  const left = useSharedValue(width);
  const open = useRef<boolean>(false);

  const blur = useDerivedValue(() => {
    return interpolate(left.value, [0, width], [8, 0]);
  });

  const reset = () => {
    open.current = false;
    snapshotContext.background.set(undefined);
    snapshotContext.takeBackground.set(false);
  };

  return (
    <NotificationsContextProvider>
      <PanGestureHandler
        activeOffsetX={[-50, 50]}
        onActivated={() => {
          snapshotContext.takeBackground.set(true);
        }}
        onEnded={() => {
          if (left.value <= width / 2) {
            left.value = withTiming(0);
            open.current = true;
          } else {
            left.value = withTiming(width, {}, () => {
              runOnJS(reset)();
            });
          }
        }}
        onGestureEvent={e => {
          if (open.current) {
            left.value = Math.max(0, e.nativeEvent.translationX);
          } else {
            left.value = width + e.nativeEvent.translationX;
          }
        }}>
        <View style={styles.layout}>
          <NotificationsList left={left} />
          {snapshotContext.background.state && (
            <Canvas
              pointerEvents="none"
              style={[{width: width, height: height}, styles.background]}>
              <Image
                x={0}
                y={0.5}
                width={width}
                height={height}
                image={snapshotContext.background.state}>
                <Blur blur={blur} />
              </Image>
            </Canvas>
          )}
          {children}
        </View>
      </PanGestureHandler>
      <ActiveNotifications />
    </NotificationsContextProvider>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    backgroundColor: '#f1f1f1',
  },
  background: {
    marginTop: 12,

    position: 'absolute',
    zIndex: APP_WIDE_Z_INDEX_LEVELS.RASTERIZED_BACKGROUND,
  },
});
