import React, {FC, useContext, useEffect, useRef} from 'react';
import {useWindowDimensions, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
  useAnimatedStyle,
  interpolate,
  useAnimatedRef,
  SharedValue,
  interpolateColor,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MessagesContext} from '../../context';
import List from './List';
import MessageInput from './MessageInput';
import theme from 'themes';

export type ConversationShowRefs = {
  footerHeight: SharedValue<number>;
  animatedScrollRef: React.RefObject<Animated.ScrollView>;
};

const Conversation: FC<{shrink: SharedValue<number>}> = ({shrink}) => {
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const context = useContext(MessagesContext);
  const footerHeight = useSharedValue(0);

  const digestedConversation = useRef(context.conversation.state);
  const animatedScrollRef = useAnimatedRef<Animated.ScrollView>();
  if (
    context.conversation.state != null &&
    digestedConversation.current !== context.conversation.state
  ) {
    digestedConversation.current = context.conversation.state;
  }

  const showMessage = useSharedValue(0);

  useEffect(() => {
    if (context.conversation.state) {
      showMessage.value = withDelay(300, withTiming(1, {duration: 750}));
    } else {
      showMessage.value = withTiming(0, {duration: 750});
    }
  }, [context.conversation.state, showMessage]);

  const AnimatedStyles = useAnimatedStyle(() => {
    return {
      marginLeft: interpolate(showMessage.value, [0, 1], [width, 0]),
      backgroundColor: interpolateColor(
        shrink.value,
        [0, 1],
        [theme.colors.muted, '#8d8a8a'],
      ),
      borderTopLeftRadius: interpolate(shrink.value, [0, 1], [0, 10]),
      borderTopRightRadius: interpolate(shrink.value, [0, 1], [0, 10]),
    };
  }, [context.conversation.state]);

  return (
    <Animated.View
      style={[
        {height: height - (insets.top + insets.bottom)},
        styles.screen,
        AnimatedStyles,
      ]}>
      <List
        dispatch={context.conversation.dispatch}
        animatedScrollRef={animatedScrollRef}
        conversation={digestedConversation.current}
        footerHeight={footerHeight}
        key={digestedConversation.current?.name}
      />
      <MessageInput
        dispatch={context.conversation.dispatch}
        conversation={digestedConversation.current}
        footerHeight={footerHeight}
        animatedScrollRef={animatedScrollRef}
      />
    </Animated.View>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  listHeader: {
    height: 0,
    marginBottom: theme.spacing.p3,
  },
  listFooter: {
    height: 0,
    marginBottom: theme.spacing.p2,
  },
  list: {
    padding: theme.spacing.p1,
    paddingBottom: 0,
    flexGrow: 1,
  },
  itemSeparator: {
    height: 1,
    marginVertical: 10,
    backgroundColor: 'gray',
  },
  screen: {
    zIndex: 2,
    position: 'absolute',
    backgroundColor: theme.colors.muted,
  },
});
