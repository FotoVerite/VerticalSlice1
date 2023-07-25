import React, {FC, useContext} from 'react';

import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

import {StyleSheet, Text} from 'react-native';
import Cursor from './Cursor';
import {HexContext} from '../../context';
import {P} from 'components/common/StyledText';
import {HexSharedValues} from '../../context/animation';

const WordDisplay: FC = () => {
  const context = useContext(HexContext);
  const sharedValues = useContext(HexSharedValues);

  const renderText = () => {
    return context.word.state.split('').map((char, index) => {
      const color = context.letters.state[3] === char ? 'yellow' : 'white';
      return (
        <P key={`word-${char}-${index}`} style={[styles.char, {color: color}]}>
          {char}
        </P>
      );
    });
  };

  const shakeAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            sharedValues.wordInputShake.value,
            [0, 0.25, 0.5, 0.75, 1],
            [0, 20, 10, 20, 0],
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, shakeAnimation]}>
      <Text style={{}}>{renderText()}</Text>
      <Cursor />
    </Animated.View>
  );
};

export default WordDisplay;

const styles = StyleSheet.create({
  char: {fontSize: 50},
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 60,
    height: 120,
  },
});
