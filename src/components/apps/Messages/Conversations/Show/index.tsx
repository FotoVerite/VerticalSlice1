import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
  runOnJS,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MessagesContext} from '../../context';
import List from './List';
import theme from 'themes';
import RouteChooser from './RouteChooser';
import {
  DigestedConversationListItem,
  MESSAGE_TYPE,
} from '../../reducers/conversationReducer/digestion/types';
import {CONTACT_NAMES} from '../../context/usersMapping';
import {produce} from 'immer';

export type ConversationShowRefs = {
  footerHeight: SharedValue<number>;
  animatedScrollRef: React.RefObject<Animated.ScrollView>;
};

const Conversation: FC<{shrink: SharedValue<number>}> = ({shrink}) => {
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const context = useContext(MessagesContext);
  const footerHeight = useSharedValue(0);
  const showConversation = useSharedValue(0);

  const digestedConversation = useRef(context.conversation.state);
  const animatedScrollRef = useAnimatedRef<Animated.ScrollView>();

  if (
    context.conversation.state != null &&
    digestedConversation.current !== context.conversation.state
  ) {
    const state = {...context.conversation.state};
    state.exchanges = updateForLastMessage(state.exchanges);
    digestedConversation.current = state;
  }

  useEffect(() => {
    if (context.conversation.state) {
      showConversation.value = withDelay(
        300,
        withTiming(1, {duration: 750}, () => {
          runOnJS(context.listCovered.set)(true);
        }),
      );
    } else {
      showConversation.value = withTiming(0, {duration: 750}, () => {
        runOnJS(context.listCovered.set)(false);
      });
    }
  }, [context.conversation.state, context.listCovered.set, showConversation]);

  const AnimatedStyles = useAnimatedStyle(() => {
    return {
      marginLeft: interpolate(showConversation.value, [0, 1], [width, 0]),
      backgroundColor: interpolateColor(
        shrink.value,
        [0, 1],
        [theme.colors.muted, '#8d8a8a'],
      ),
      borderTopLeftRadius: interpolate(shrink.value, [0, 1], [0, 10]),
      borderTopRightRadius: interpolate(shrink.value, [0, 1], [0, 10]),
    };
  }, [context.conversation.state]);

  const prevChooser = useRef<ReactElement | undefined>(undefined);

  const chooser = useMemo(() => {
    if (context.conversation.state) {
      const node = (
        <RouteChooser
          dispatch={context.conversation.dispatch}
          conversation={context.conversation.state}
          footerHeight={footerHeight}
          animatedScrollRef={animatedScrollRef}
          key={`${context.conversation.state.name}-chooser`}
        />
      );
      prevChooser.current = node;
      return node;
    } else {
      return prevChooser.current;
    }
  }, [
    animatedScrollRef,
    context.conversation.dispatch,
    context.conversation.state,
    footerHeight,
  ]);

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
      {chooser}
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

const DELIVERED_READ_HEIGHT = 20;
const updateForLastMessage = (_exchanges: DigestedConversationListItem[]) => {
  const lastMessageSent = _exchanges
    .filter(
      item =>
        item.type !== MESSAGE_TYPE.TIME && item.name === CONTACT_NAMES.SELF,
    )
    .slice(-1)[0];
  let _lastMessageSentIndex = _exchanges.indexOf(lastMessageSent);
  if (_lastMessageSentIndex === -1) {
    return _exchanges;
  }
  _exchanges = produce(_exchanges, draft => {
    draft[_lastMessageSentIndex].lastMessageSent = true;
    draft[_lastMessageSentIndex].height += DELIVERED_READ_HEIGHT;
    _lastMessageSentIndex += 1;
    while (_lastMessageSentIndex < draft.length - 1) {
      draft[_lastMessageSentIndex].offset += DELIVERED_READ_HEIGHT;
      _lastMessageSentIndex += 1;
    }
    return draft;
  });
  return _exchanges;
};
