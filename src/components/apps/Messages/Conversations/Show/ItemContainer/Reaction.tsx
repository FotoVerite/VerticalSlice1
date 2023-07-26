/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import Svg, {Ellipse} from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ReactionType {
  reaction: {name: string; color: string; delay: number};
  delay: number;
  left: boolean;
  colors: string[];
  activeRoute: boolean;
}

const Reaction: FC<ReactionType> = ({
  activeRoute,
  reaction,
  left,
  colors: color,
}) => {
  const reactionColor = left ? color[2] : '#5a60b8';
  const scale = useSharedValue(activeRoute ? 0 : 0.8);
  useEffect(() => {
    scale.value = withDelay(
      reaction.delay || 1000,
      withSpring(0.8, {overshootClamping: false, stiffness: 250}),
    );
  }, [activeRoute, reaction.delay, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    if (activeRoute) {
      return {transform: [{scale: scale.value}]};
    } else {
      return {};
    }
  }, [activeRoute]);

  return (
    <Animated.View
      style={[
        styles.reaction,
        {
          left: left ? undefined : -20,
          top: -15,
          right: left ? -15 : undefined,
          transform: [{scaleX: -0.8}, {scaleY: 0.8}],
        },
        animatedStyle,
      ]}>
      <View style={{transform: [{scaleX: left ? -1 : 1}]}}>
        <Svg viewBox="27.303 21.379 116.792 122.135" width={36} height={36}>
          <Ellipse
            cx={79.957}
            cy={73.086}
            rx={51.461}
            ry={51.461}
            fill={reactionColor || '#000aaa'}
            stroke="transparent"
          />
          <Ellipse
            cx={116.915}
            cy={114.09}
            rx={14.267}
            ry={14.267}
            fill={reactionColor || '#000aaa'}
            stroke="transparent"
          />
          <Ellipse
            cx={137.97}
            cy={136.633}
            rx={6.208}
            ry={6.208}
            fill={reactionColor || '#000aaa'}
            stroke="transparent"
          />
        </Svg>
      </View>
      <Icon
        name={reaction.name}
        color={reaction.color}
        size={16}
        style={[
          styles.icon,
          {
            left: left ? undefined : 8,
            right: left ? 8 : undefined,
          },
        ]}
      />
    </Animated.View>
  );
};
export default Reaction;

const styles = StyleSheet.create({
  reaction: {
    position: 'absolute',
    top: -10,
    zIndex: 2,
  },
  icon: {
    position: 'absolute',
    top: 8,
  },
});
