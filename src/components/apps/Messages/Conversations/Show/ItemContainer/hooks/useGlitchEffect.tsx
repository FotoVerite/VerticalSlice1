import React, {ReactNode, useRef} from 'react';

import {
  useClockValue,
  useComputedValue,
  rect,
  Group,
  AnimatedProp,
  ClipDef,
} from '@shopify/react-native-skia';

export const useGlitchEffect = (
  height: number,
  width: number,
  content: ReactNode | ReactNode[],
  clip?: AnimatedProp<ClipDef | undefined, any>,
  interval: number = 250,
) => {
  const clock = useClockValue();
  const lastInterval = useRef(clock.current);
  const rectY = useRef(20);
  const rectHeight = useRef(15);

  const animatedClip = useComputedValue(() => {
    if (lastInterval.current < clock.current - interval) {
      lastInterval.current = clock.current;
      rectHeight.current = Math.max(5, Math.floor(Math.random() * 15));
      rectY.current = Math.floor(Math.random() * height - rectHeight.current);
    }
    const rHeight =
      ((clock.current % interval) / interval) * rectHeight.current;
    return rect(0, rectY.current, width, rHeight);
  }, [clock]);

  return (
    <Group clip={animatedClip}>
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
  );
};
