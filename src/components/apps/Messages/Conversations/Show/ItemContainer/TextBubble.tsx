import React, {FC} from 'react';

import {
  Canvas,
  Group,
  LinearGradient,
  Rect,
  vec,
} from '@shopify/react-native-skia';

import Animated, {SharedValue} from 'react-native-reanimated';
import {
  DigestedConversationStringItemType,
  EFFECT_TYPE,
} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

import {useHeightDeterminedGradient} from './hooks/useHeightDeterminedGradient';
import {useGlitchEffect} from './hooks/useGlitchEffect';

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
  effect,
}) => {
  const computedColors = useHeightDeterminedGradient(
    colors,
    offset,
    leftSide,
    scrollHandler,
  );

  const glitchEffect = useGlitchEffect(height, width, content, clip);

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
      {effect?.type == EFFECT_TYPE.GLITCH && glitchEffect}
    </Canvas>
  );
};
