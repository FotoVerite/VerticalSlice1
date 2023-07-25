import React, {FC, useContext} from 'react';
import Fuse from 'fuse.js';

import theme from 'themes';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, TextInput} from 'react-native';
import {ConversationType} from '../../context/types';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {MessagesContext} from '../../context';
import {GenericStateType} from 'types/genericContextTypes';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Search: FC<{
  conversations: GenericStateType<ConversationType[]>;
  scrollOffset: SharedValue<number>;
}> = ({conversations, scrollOffset}) => {
  const options = {
    isCaseSensitive: true,

    keys: ['name', 'tags'],
  };

  const fuse = new Fuse<ConversationType>(conversations.state, options);
  const context = useContext(MessagesContext);

  const animatedHeight = useDerivedValue(() => {
    return Math.max(40 - scrollOffset.value, 0);
  });

  const heightAnimation = useAnimatedStyle(() => {
    return {height: animatedHeight.value};
  });

  const opacityAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedHeight.value,
        [40, 25],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    };
  }, [scrollOffset.value]);

  return (
    <Animated.View style={[styles.searchInput]}>
      <AnimatedIcon
        name={'search'}
        size={20}
        style={[styles.icon, opacityAnimation]}
      />
      <AnimatedTextInput
        style={[styles.textInput, opacityAnimation]}
        placeholder={'Search'}
        onChangeText={text => {
          let results = fuse.search(text).map(item => item.item);
          if (text == undefined || text === '') {
            results = context.conversations;
          }
          conversations.set(results);
        }}
      />
    </Animated.View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchInput: {
    maxHeight: 40,
    borderColor: '#dfdede',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: theme.BorderRadius.small,
    height: 40,
    backgroundColor: '#ddddcc',
    marginHorizontal: theme.spacing.p1,
    alignItems: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
    marginBottom: 2,
  },
  textInput: {
    flexGrow: 1,
  },
  icon: {
    marginEnd: theme.spacing.p1,
  },
});
