import React, {FC, useContext, useRef} from 'react';

import {
  Canvas,
  Group,
  LinearGradient,
  Rect,
  Text,
  rect,
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

  let clock1 = useClockValue();
  const interval = 250;
  const lastInterval = useRef(clock1.current);
  const rectY = useRef(20);
  const rectHeight = useRef(15);

  if (true) {
    clock1 = false;
  }

  const animatedSection = useComputedValue(() => {
    if (lastInterval.current < clock1.current - interval) {
      lastInterval.current = clock1.current;
      rectHeight.current = Math.max(2, Math.floor(Math.random() * height - 10));
      rectY.current = Math.floor(Math.random() * height - rectHeight.current);
    }
    const rHeight =
      ((clock1.current % interval) / interval) * rectHeight.current;

    return rect(0, rectY.current, width, rHeight);
  }, [clock1]);

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
      {false && (
        <Group clip={animatedSection}>
          <Group
            blendMode="difference"
            clip={clip}
            transform={[
              {scale: 1.03},
              {translateX: -3},
              {translateY: -2},
              {skewX: 0.05},
            ]}>
            {content}
          </Group>
        </Group>
      )}
    </Canvas>
  );
};
