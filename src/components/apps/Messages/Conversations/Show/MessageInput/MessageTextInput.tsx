import React, {FC, useContext, useEffect} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from 'themes';
import Cursor from './Cursor';
import {MessagesContext} from 'components/apps/Messages/context';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {
  CONTACT_NAMES,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';

const MessageTextInput: FC<{
  active: boolean;
  setActive: (value: boolean) => void;
  hasRoute: boolean;
}> = ({active, setActive, hasRoute}) => {
  const rotation = useSharedValue(0);
  const glow = useSharedValue(0);
  const conversation = useContext(MessagesContext).conversation;
  const activePath = conversation.state?.activePath;

  const AnimatedIcon = Animated.createAnimatedComponent(Icon);

  useEffect(() => {
    rotation.value = withTiming(active ? 1 : 0, {easing: Easing.bounce});
  }, [active, rotation]);

  useEffect(() => {
    if (hasRoute && !active) {
      glow.value = withRepeat(
        withSequence(
          withTiming(0.4, {duration: 1000, easing: Easing.bounce}),
          withTiming(0, {duration: 750, easing: Easing.bounce}),
        ),
        -1,
        true,
      );
    } else if (active) {
      glow.value = withTiming(0.5);
    } else {
      glow.value = withTiming(0);
    }
  }, [active, glow, hasRoute]);

  const animatedIconStyles = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        glow.value,
        [0, 1],
        ['black', conversation.state?.interfaceColor || 'black'],
      ),
      transform: [
        {rotate: `${interpolate(rotation.value, [0, 1], [0, -180])}deg`},
      ],
    };
  }, [active, conversation.state?.interfaceColor]);

  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (activePath == null || activePath.length === 0) {
            setActive(!active);
          }
        }}>
        <View style={[styles.textInput]}>
          {active && <Cursor />}
          <AnimatedIcon
            size={20}
            name="chevron-down"
            style={[styles.icon, animatedIconStyles]}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MessageTextInput;

const styles = StyleSheet.create({
  container: {
    height: 50,
    zIndex: 4,
    justifyContent: 'center',
  },
  textInput: {
    maxHeight: 40,
    borderColor: '#cfcdcd',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: theme.BorderRadius.normal,
    height: 40,
    marginHorizontal: theme.spacing.p1,
    alignItems: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
    marginBottom: 2,
  },
  icon: {
    marginStart: 'auto',
  },
});
