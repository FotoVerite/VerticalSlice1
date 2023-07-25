import React, {FC} from 'react';
import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';

import theme from 'themes';

const Footer: FC<{footerHeight: SharedValue<number>}> = ({footerHeight}) => {
  const animatedMargin = useAnimatedStyle(() => {
    return {
      marginBottom: theme.spacing.p2 + 50 + footerHeight.value,
    };
  });
  return <Animated.View style={animatedMargin} />;
};

export default Footer;
