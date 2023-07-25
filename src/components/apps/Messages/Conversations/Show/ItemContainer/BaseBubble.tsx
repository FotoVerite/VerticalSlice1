import React, {FC, useEffect, useRef} from 'react';
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Image, View} from 'react-native';

import {Row} from 'components/common/layout';
import {StyleSheet} from 'react-native';
import theme from 'themes';
import {
  BubbleItemType,
  DigestedConversationListItem,
  DigestedItemTypes,
} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {delayFor} from 'common';
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from 'components/apps/Messages/reducers/conversationReducer/types';
import {EmojiBubble} from './EmojiBubble';
import {GlyphBubble} from './GlyphBubble';
import {ImageBubble} from './ImageBubble';
import {SnapshotBubble} from './SnapshotBubble';
import {TextBubble} from './TextBubble';
import Reaction from './Reaction';
import {P} from 'components/common/StyledText';
import {VCardBubble} from './VCardBubble';
import {NumberBubble} from './NumberBubble';

const renderBubbleType = (
  item: BubbleItemType,
  index: number,
  scrollHandler: SharedValue<number>,
  scrollRef: React.RefObject<Animated.ScrollView>,
) => {
  switch (item.type) {
    case DigestedItemTypes.EMOJI:
      return <EmojiBubble {...item} />;
    case DigestedItemTypes.IMAGE:
      return <ImageBubble {...item} />;
    case DigestedItemTypes.GLYPH:
      return <GlyphBubble {...item} scrollHandler={scrollHandler} />;
    case DigestedItemTypes.NUMBER:
      return (
        <NumberBubble
          {...item}
          scrollHandler={scrollHandler}
          scrollRef={scrollRef}
        />
      );
    case DigestedItemTypes.SNAPSHOT:
      return (
        <SnapshotBubble
          {...item}
          index={index}
          scrollHandler={scrollHandler}
          scrollRef={scrollRef}
        />
      );
    case DigestedItemTypes.STRING:
      return (
        <TextBubble
          {...item}
          scrollHandler={scrollHandler}
          scrollRef={scrollRef}
        />
      );

    case DigestedItemTypes.VCARD:
      return (
        <VCardBubble
          {...item}
          scrollHandler={scrollHandler}
          scrollRef={scrollRef}
        />
      );

    default:
      break;
  }
};

export const BaseBubble: FC<{
  dispatch: (action: ConversationReducerActionsType) => Promise<void>;
  item: BubbleItemType;
  index: number;
  scrollHandler: SharedValue<number>;
  scrollRef: React.RefObject<Animated.ScrollView>;
  group: boolean;
}> = ({dispatch, item, index, group, scrollRef, scrollHandler}) => {
  const {
    avatar,
    alignItems,
    colors,
    height,
    leftSide,
    paddingBottom,
    reaction,
  } = item;
  const opacity = useSharedValue(
    item.messageDelay && item.type !== DigestedItemTypes.SNAPSHOT ? 0 : 1,
  );
  const sentDispatch = useRef(false);

  const fadeInAnimation = useAnimatedStyle(() => {
    return {opacity: opacity.value};
  });

  useEffect(() => {
    const renderNextMessage = async (delay: number) => {
      await delayFor(delay);
      scrollRef.current?.scrollToEnd({animated: true});
      opacity.value = withTiming(1, {duration: 300}, finished => {
        if (finished) {
          runOnJS(dispatch)({
            type: CONVERSATION_REDUCER_ACTIONS.CONTINUE_ROUTE,
          });
        }
      });
    };
    if (
      !sentDispatch.current &&
      item.messageDelay &&
      item.type !== DigestedItemTypes.SNAPSHOT
    ) {
      sentDispatch.current = true;
      renderNextMessage(
        item.messageDelay + (item.leftSide ? (item.typingDelay || 0) + 850 : 0),
      );
    }
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: height,
          alignItems: alignItems,
          marginBottom: paddingBottom,
        },
        fadeInAnimation,
      ]}>
      <Row style={styles.row}>
        {leftSide && (
          <View style={styles.avatarContainer}>
            {avatar && <Image source={avatar} style={styles.avatar} />}
          </View>
        )}
        {reaction && (
          <Reaction reaction={reaction} left={leftSide} colors={colors} />
        )}
        <View>
          {renderBubbleType(item, index, scrollHandler, scrollRef)}
          {group && item.avatar && item.name !== 'Self' && (
            <P size="s" style={styles.name}>
              {item.name}
            </P>
          )}
        </View>
      </Row>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  name: {
    marginTop: -20,
    marginLeft: 20,
  },
  row: {
    alignItems: 'flex-end',
    padding: 0,
    margin: 0,
  },
  avatarContainer: {
    width: 30,
    height: 30,
    marginEnd: theme.spacing.p1,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: theme.BorderRadius.normal,
  },
});
