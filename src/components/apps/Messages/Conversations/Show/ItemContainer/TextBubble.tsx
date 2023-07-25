/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-bitwise */
import React, {FC} from 'react';

import {
  Canvas,
  Group,
  LinearGradient,
  Rect,
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
    </Canvas>
  );
};
