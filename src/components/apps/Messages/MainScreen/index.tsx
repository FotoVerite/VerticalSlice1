import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import {MessagesContext} from '../context';
import Conversation from '../Conversations/Show';
import ConversationHeader from '../Header/ConversationHeader';
import Conversations from '../Conversations/List';
import theme from 'themes';
import Header from '../Header';

const MainScreen: FC = ({}) => {
  const context = useContext(MessagesContext);

  const shrink = useSharedValue(0);

  useEffect(() => {
    if (context.newMessage.state) {
      shrink.value = withDelay(250, withTiming(1, {duration: 500}));
    } else {
      shrink.value = withTiming(0, {duration: 500});
    }
  }, [context.newMessage.state, shrink]);

  const AnimateShrink = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        shrink.value,
        [0, 1],
        ['transparent', '#8d8a8a'],
      ),
      borderTopLeftRadius: interpolate(shrink.value, [0, 1], [0, 10]),
      borderTopRightRadius: interpolate(shrink.value, [0, 1], [0, 10]),
      transform: [{scale: interpolate(shrink.value, [0, 1], [1, 0.95])}],
    };
  }, [context.newMessage.state]);

  return (
    <Animated.View style={[styles.screen, AnimateShrink]}>
      <Header />
      <Conversations />
      {context.conversation && <Conversation shrink={shrink} />}
      <ConversationHeader shrink={shrink} />
    </Animated.View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    flex: 1,
  },
  itemSeparator: {
    height: 1,
    marginVertical: 10,
    backgroundColor: 'gray',
  },

  list: {
    paddingHorizontal: theme.spacing.p2,
    flexGrow: 1,
  },
});
