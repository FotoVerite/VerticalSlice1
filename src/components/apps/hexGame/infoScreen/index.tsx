import React, {FC, useContext} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';

import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HexSharedValues} from '../context/animation';
import FoundWordsList from './FoundWordsList';
import Hamburger from '../Header/Hamburger';
import Points from './Points';
import {Row} from 'components/common/layout';

const InfoScreen: FC = () => {
  const {width, height} = useWindowDimensions();
  const shared = useContext(HexSharedValues);
  const insets = useSafeAreaInsets();
  const infoOpened = shared.infoOpened;

  const infoScreenAnimatedPosition = useAnimatedStyle(() => {
    return {
      left: interpolate(infoOpened.value, [0, 1], [width, 0]),
    };
  });

  const styles = StyleSheet.create({
    infoScreen: {
      zIndex: 12,
      top: insets.top,
      position: 'absolute',
      height: height - insets.top - insets.bottom - 30,
      width: width,
      flex: 1,
      flexGrow: 1,
      bottom: 0,
      borderLeftWidth: 1,
      borderColor: 'white',
      backgroundColor: 'black',
    },
  });

  return (
    <Animated.View style={[styles.infoScreen, infoScreenAnimatedPosition]}>
      <Row style={{flexGrow: 0}}>
        <Hamburger />
      </Row>

      <Points />

      <FoundWordsList />
    </Animated.View>
  );
};

export default InfoScreen;
