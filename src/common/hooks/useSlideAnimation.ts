import {DependencyList, useEffect} from 'react';
import {
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export const useSlideAnimation = (
  styleProp: 'marginLeft' | 'marginTop' | 'marginRight' | 'marginEnd',
  width: number,
  deps: DependencyList,
  options?: {
    startDelay?: number;
    endDelay?: number;
    animationDuration?: number;
  },
) => {
  const amount = useSharedValue(0);
  const _options = Object.assign(
    {
      startDelay: 0,
      endDelay: 0,
      animationDuration: 750,
    },
    options,
  );

  const {startDelay, endDelay, animationDuration} = _options;

  useEffect(() => {
    if (deps.every(dep => dep === true)) {
      amount.value = withDelay(
        startDelay,
        withTiming(1, {duration: animationDuration}),
      );
    } else {
      amount.value = withTiming(endDelay, {
        duration: animationDuration,
      });
    }
  }, [...deps, amount]);

  return useAnimatedStyle(() => {
    return {
      marginLeft: interpolate(amount.value, [0, 1], [width, 0]),
    };
  }, deps);
};
