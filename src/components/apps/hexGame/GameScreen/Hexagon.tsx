import React, {FC, useContext, useEffect, useState} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';

import Svg, {Path, Text} from 'react-native-svg';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {interpolatePath, parse} from 'react-native-redash';
import {HexContext} from '../context';
import {shakeInput} from '../controller';
import {HexSharedValues} from '../context/animation';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedLetter = Animated.createAnimatedComponent(Text);

const Hexagon: FC<{
  letter: string;
  zIndex?: number;
  style: ViewStyle;
  colors: string[];
}> = ({colors, letter, zIndex, style}) => {
  const context = useContext(HexContext);
  const sharedValues = useContext(HexSharedValues);

  const [char, setChar] = useState(letter);
  const [reset, setReset] = useState(false);

  const hexPressed = useSharedValue(0);
  const letterOpacity = useSharedValue(1);
  const largeHex = parse('M300,150 225,280 75,280 0,150 75,20 225,20');
  const smallHex = parse('M290,150 215,270 85,270 10,150 85,30 215,30');

  useEffect(() => {
    letterOpacity.value = withTiming(0, {duration: 150}, isFinished => {
      if (isFinished) {
        runOnJS(setChar)(letter);
      }
    });
  }, [letter, letterOpacity]);

  if (letter !== char) {
    letterOpacity.value = withTiming(0, {duration: 150}, isFinished => {
      if (isFinished) {
        runOnJS(setChar)(letter);
      }
    });
  }

  useEffect(() => {
    letterOpacity.value = withDelay(300, withTiming(1, {duration: 500}));
  }, [char, letterOpacity]);

  useAnimatedReaction(
    () => {
      return hexPressed.value == 1;
    },
    finished => {
      // data holds what was returned from the first worklet's execution
      if (reset && finished) {
        hexPressed.value = withTiming(0, {duration: 150});
        runOnJS(setReset)(false);
      }
    },
  );

  const clickHex = () => {
    'worklet';
    if (
      context.word.state.length < longestWord &&
      context.notification.state === ''
    ) {
      runOnJS(context.word.set)(word => (word += char));
      hexPressed.value = withTiming(1, {duration: 300});
    } else {
      shakeInput(sharedValues.wordInputShake);
    }
  };

  const longestWord = Math.max(
    ...Array.from(context.answers.state).map(word => word.length),
  );

  const animatedProps = useAnimatedProps(() => {
    const d = interpolatePath(hexPressed.value, [0, 1], [largeHex, smallHex]);

    return {
      d: d,
      fill: interpolateColor(hexPressed.value, [0, 1], [colors[0], colors[1]]),
    };
  });

  const letterProps = useAnimatedProps(() => {
    return {
      opacity: letterOpacity.value,
    };
  });

  const styles = StyleSheet.create({
    hex: {
      width: 100,
      height: 100,
      zIndex: 1 || zIndex,
      position: 'absolute',
    },
  });

  return (
    <Svg
      viewBox={`0 0 ${300} ${300}`}
      onPressIn={() => clickHex()}
      onPressOut={() => setReset(true)}
      style={[styles.hex, style]}>
      <AnimatedPath
        fill={'white'}
        stroke="black"
        strokeWidth={5}
        animatedProps={animatedProps}
      />
      <AnimatedLetter
        fill={'#000'}
        fontSize="150"
        opacity={0}
        x={150}
        y={205}
        animatedProps={letterProps}
        textAnchor="middle">
        {char.toUpperCase()}
      </AnimatedLetter>
    </Svg>
  );
};

export default Hexagon;
