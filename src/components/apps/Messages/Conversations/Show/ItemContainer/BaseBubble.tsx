import React, {FC, useContext, useEffect, useRef} from 'react';
import Animated, {
  SharedValue,
  measure,
  runOnJS,
  runOnUI,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Image, Text, View} from 'react-native';

import {Row} from 'common/styles/layout';
import {StyleSheet} from 'react-native';
import theme from 'themes';
import {
  BubbleItemType,
  EFFECT_TYPE,
  MESSAGE_TYPE,
} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {delayFor} from 'common';
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from 'components/apps/Messages/reducers/conversationReducer/types';
import {EmojiBubble} from './EmojiBubble';
import {GlyphBubble} from './GlyphBubble';
import {ImageBubble} from './ImageBubble';
import {TextBubble} from './TextBubble';
import Reaction from './Reaction';
import {P} from 'common/styles/StyledText';
import {VCardBubble} from './VCardBubble';
import {NumberBubble} from './NumberBubble';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {SnapShotContext} from 'components/Snapshot/context';
import {SnapshotBubble} from './SnapshotBubble';
import {BackgroundSnapshotBubble} from './BackgroundSnapshot';

const renderBubbleType = (
  dispatch: (action: ConversationReducerActionsType) => Promise<void>,
  item: BubbleItemType,
  index: number,
  scrollHandler: SharedValue<number>,
  scrollRef: React.RefObject<Animated.ScrollView>,
) => {
  switch (item.type) {
    case MESSAGE_TYPE.EMOJI:
      return <EmojiBubble {...item} />;
    case MESSAGE_TYPE.IMAGE:
      return <ImageBubble {...item} />;
    case MESSAGE_TYPE.GLYPH:
      return <GlyphBubble {...item} scrollHandler={scrollHandler} />;
    case MESSAGE_TYPE.NUMBER:
      return (
        <NumberBubble
          {...item}
          scrollHandler={scrollHandler}
          scrollRef={scrollRef}
        />
      );
    case MESSAGE_TYPE.SNAPSHOT:
      return (
        <SnapshotBubble
          dispatch={dispatch}
          {...item}
          index={index}
          scrollHandler={scrollHandler}
          scrollRef={scrollRef}
        />
      );
    case MESSAGE_TYPE.BACKGROUND_SNAPSHOT:
      return (
        <BackgroundSnapshotBubble
          dispatch={dispatch}
          {...item}
          index={index}
          scrollHandler={scrollHandler}
          scrollRef={scrollRef}
        />
      );
    case MESSAGE_TYPE.STRING:
      return (
        <TextBubble
          {...item}
          scrollHandler={scrollHandler}
          scrollRef={scrollRef}
        />
      );

    case MESSAGE_TYPE.VCARD:
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
  animationFinished: boolean;
  contactName: CONTACT_NAMES;
  dispatch: (action: ConversationReducerActionsType) => Promise<void>;
  item: BubbleItemType;
  index: number;
  scrollHandler: SharedValue<number>;
  scrollRef: React.RefObject<Animated.ScrollView>;
  group: boolean;
}> = ({
  animationFinished,
  contactName,
  dispatch,
  item,
  index,
  group,
  scrollRef,
  scrollHandler,
}) => {
  const {
    avatar,
    alignItems,
    colors,
    effect,
    height,
    leftSide,
    paddingBottom,
    reaction,
  } = item;
  const SNAPSHOT_TYPES = [
    MESSAGE_TYPE.SNAPSHOT,
    MESSAGE_TYPE.BACKGROUND_SNAPSHOT,
  ];
  const isSnapshot = SNAPSHOT_TYPES.includes(item.type);
  const snapshotContext = useContext(SnapShotContext);
  const originalHeight = useSharedValue<number>(item.height);
  const deliveredOpacity = useSharedValue(item.lastMessageSent ? 1 : 0);
  const opacity = useSharedValue(item.messageDelay && !isSnapshot ? 0 : 1);
  const sentDispatch = useRef(false);

  const fadeInAnimation = useAnimatedStyle(() => {
    return {opacity: opacity.value};
  });

  const continueRoute = async () => {
    await delayFor(300);
    dispatch({
      type: CONVERSATION_REDUCER_ACTIONS.CONTINUE_ROUTE,
    });
  };

  useEffect(() => {
    const renderNextMessage = async (delay: number) => {
      if (!mounted) {
        return;
      }
      await delayFor(delay);
      if (item.name !== CONTACT_NAMES.SELF && item.height > 45) {
        scrollRef.current?.scrollToOffset({
          offset: scrollHandler.value + item.height - 45,
          animated: true,
        });
      } else {
        scrollRef.current?.scrollToEnd({animated: true});
      }
      handlePress();
      opacity.value = withTiming(1, {duration: 300}, finished => {
        if (finished) {
          runOnJS(continueRoute)();
        }
      });
    };
    let mounted = true;
    if (!sentDispatch.current && item.messageDelay && !isSnapshot) {
      sentDispatch.current = true;
      renderNextMessage(
        item.messageDelay + (item.leftSide ? (item.typingDelay || 0) + 850 : 0),
      );
    } else {
      sentDispatch.current = true;
    }
    return () => {
      mounted = false;
    };
  }, []);

  const animatedRef = useAnimatedRef<Animated.View>();

  const handlePress = () => {
    runOnUI(() => {
      const measurement = measure(animatedRef);
      if (measurement === null) {
        return;
      }
    })();
  };

  useEffect(() => {
    if (originalHeight.value !== item.height) {
      originalHeight.value = withTiming(item.height);
    }
  }, [deliveredOpacity, item.height, originalHeight]);

  useEffect(() => {
    const takeSnapshot = async () => {
      await delayFor(100);
      snapshotContext.takeQuietly.set(effect?.data);
    };
    if (animationFinished && effect?.type === EFFECT_TYPE.SNAPSHOT) {
      takeSnapshot();
    }
  }, [animationFinished, effect]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: originalHeight,
          alignItems: alignItems,
          marginBottom: item.paddingBottom,
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
          <Reaction
            reaction={reaction}
            left={leftSide}
            colors={colors}
            activeRoute={item.messageDelay != null}
          />
        )}
        <View style={{alignSelf: 'flex-start'}}>
          <Animated.View ref={animatedRef}>
            {renderBubbleType(dispatch, item, index, scrollHandler, scrollRef)}
          </Animated.View>
          {group && item.avatar && item.name !== 'Self' && (
            <P size="s" style={styles.name}>
              {item.name}
            </P>
          )}
          {item.lastMessageSent && (
            <Animated.Text style={[styles.delivered]}>
              {item.deliveredOnly || contactName === CONTACT_NAMES.LEO
                ? 'Delivered'
                : 'Read'}
              {item.readTimeStamp?.toDateString()}
            </Animated.Text>
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
  delivered: {
    textAlign: 'right',
    margin: 0,
    padding: 0,
    marginRight: theme.spacing.p2,
    marginTop: -20,
    height: 20,
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
