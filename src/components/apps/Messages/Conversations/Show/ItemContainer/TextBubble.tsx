import React, {FC, useContext} from 'react';

import {
  Canvas,
  Group,
  LinearGradient,
  Rect,
  Text,
  useClockValue,
  useComputedValue,
  vec,
} from '@shopify/react-native-skia';

import Animated, {SharedValue} from 'react-native-reanimated';
import {DigestedConversationStringItemType} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

import {useHeightDeterminedGradient} from './hooks/useHeightDeterminedGradient';

export const TextBubble: FC<
  DigestedConversationStringItemType & {
    scrollHandler: SharedValue<number>;
    scrollRef: React.RefObject<Animated.ScrollView>;
  }
> = ({
  colors,
  scrollHandler,
  offset,
  content,
  leftSide,
  width,
  height,
  clip,
}) => {
  const computedColors = useHeightDeterminedGradient(
    colors,
    offset,
    leftSide,
    scrollHandler,
  );

  // const clock1 = useClockValue();
  // const interval = 1000;

  // const animatedHeight = useComputedValue(() => {
  //   return ((clock1.current % interval) / interval) * height;
  // }, [clock1]);

  // const animatedTranslate = useComputedValue(() => {
  //   const amount = ((clock1.current % interval) / interval) * 10 * -1;
  //   return [{translateX: amount}, {translateY: amount}];
  // }, [clock1]);

  return (
    <Canvas
      style={{
        width: width,
        height: height,
      }}>
      <Group clip={clip}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            colors={computedColors}
            start={vec(0, 0)}
            end={vec(0, height)}
          />
        </Rect>
      </Group>
      {content}
      {/* <Group blendMode="multiply" clip={clip}>
        <Rect
          x={0}
          y={animatedHeight}
          width={width}
          height={animatedHeight}
          color="red"
        />
        {content}
      </Group> */}
    </Canvas>
  );
};
