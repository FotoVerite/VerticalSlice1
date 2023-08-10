/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-bitwise */
import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';

import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import {
  DigestedConversationListItem,
  DigestedConversationStringItemType,
} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

import {WaitingBubble} from './WaitingBubble';
import {BaseBubble} from '../BaseBubble';
import {ConversationReducerActionsType} from 'components/apps/Messages/reducers/conversationReducer/types';

export const TypingBubble: FC<{
  dispatch: (action: ConversationReducerActionsType) => Promise<void>;
  item: DigestedConversationStringItemType;
  index: number;
  scrollHandler: SharedValue<number>;
  scrollRef: React.RefObject<FlatList<DigestedConversationListItem>>;
  group: boolean;
}> = props => {
  const {item, scrollRef, scrollHandler, group} = props;
  const {height, typingDelay, paddingBottom} = item;
  const containerOpacity = useSharedValue(0);
  const opacity = useSharedValue(1);
  const [renderWaiting, setRenderWaiting] = useState(true);

  const containerOpacityAnimation = useAnimatedStyle(() => {
    return {opacity: containerOpacity.value};
  });
  const waitingOpacity = useAnimatedStyle(() => {
    return {opacity: opacity.value};
  });

  const textOpacity = useAnimatedStyle(() => {
    return {opacity: interpolate(opacity.value, [1, 0], [0, 1])};
  });

  useEffect(() => {
    containerOpacity.value = withTiming(1, {duration: 200});
    opacity.value = withDelay(
      1350 + (typingDelay || 0),
      withTiming(0, {duration: 300}, finished => {
        if (finished) {
          runOnJS(setRenderWaiting)(false);
        }
      }),
    );
  }, [containerOpacity, opacity, typingDelay]);

  useEffect(() => {
    if (scrollRef) {
      scrollRef.current?.scrollToOffset({
        offset: scrollHandler.value + 40,
        animated: true,
      });
    }
  }, []);

  return (
    <Animated.View
      style={[{height: height + paddingBottom}, containerOpacityAnimation]}>
      {renderWaiting && (
        <Animated.View style={[styles.waiting, waitingOpacity]}>
          <WaitingBubble {...props} />
        </Animated.View>
      )}
      <Animated.View style={[styles.main, textOpacity]}>
        <BaseBubble {...props} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  waiting: {
    position: 'absolute',
  },
  main: {},
});
