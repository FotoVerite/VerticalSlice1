import React, {FC, useCallback, useContext, useEffect} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {generateSkiaNode} from 'components/apps/Messages/reducers/conversationReducer/digestion/skiaCalculations';
import {ApplicationContext} from 'context';
import {DisplayedTextSk} from './components/DisplayedTextSk';

export enum DISPLAYED_TEXT_STATES {
  DISPLAYED,
  SENT,
}

const DisplayedText: FC<{
  text: string;
  state: DISPLAYED_TEXT_STATES;
  cb: () => Promise<void>;
}> = ({cb, state, text}) => {
  const appContext = useContext(ApplicationContext);
  const {height, width} = useWindowDimensions();

  const sent = useSharedValue(0);
  const visibility = useSharedValue(1);

  const blurAndRemove = useCallback(() => {
    'worklet';
    visibility.value = withTiming(0, {}, finished => {
      if (finished && cb) {
        runOnJS(cb)();
      }
    });
  }, [cb, visibility]);

  useEffect(() => {
    switch (state) {
      case DISPLAYED_TEXT_STATES.DISPLAYED:
        sent.value = withTiming(0);
        break;
      case DISPLAYED_TEXT_STATES.SENT:
        sent.value = withTiming(1, {}, () => {
          blurAndRemove();
        });
        break;
      default:
        sent.value = withTiming(0);

        break;
    }
  }, [state, sent, visibility, blurAndRemove]);

  const [numberOfLines, textWidth, nodes, cursorVectors] = generateSkiaNode(
    appContext.fonts.HelveticaNeue,
    appContext.fonts.HelveticaNeue,
    text,
    width - 78,
    false,
  );

  const textAnimation = useAnimatedStyle(() => {
    return {
      left: interpolate(sent.value, [0, 1], [0, width - textWidth - 44]),
    };
  }, [sent, textWidth]);

  const containerAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(sent.value, [0, 1], [numberOfLines + 15, 35]),
    };
  }, [sent, numberOfLines]);

  return (
    <>
      <Animated.View style={[styles.skText, textAnimation]}>
        <DisplayedTextSk
          sent={sent}
          numberOfLines={numberOfLines}
          width={textWidth}
          nodes={nodes}
          cursorVector={cursorVectors}
          font={appContext.fonts.SFPro}
          visibility={visibility}
        />
      </Animated.View>
      <Animated.View
        style={[
          {
            minHeight: 35,
            width: width - 78,
            height: numberOfLines + 15,
          },
          containerAnimation,
        ]}
      />
    </>
  );
};

export default DisplayedText;

const styles = StyleSheet.create({
  skText: {
    flexShrink: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    zIndex: 4,
  },
});
