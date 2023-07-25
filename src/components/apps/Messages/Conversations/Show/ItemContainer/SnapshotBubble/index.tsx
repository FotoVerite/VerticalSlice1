/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-bitwise */
import React, {FC, useContext, useEffect, useState} from 'react';
import {View} from 'react-native';

import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import {DigestedConversationSnapShotItemType} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

import {SnapShotContext} from 'components/Snapshot/context';
import {BubblePath} from 'components/apps/Messages/reducers/conversationReducer/digestion/BubblePath';
import {SkImage} from '@shopify/react-native-skia';
import {SnapshotBubbleRenderer} from './SnapshotBubbleRenderer';
import {MessagesContext} from 'components/apps/Messages/context';
import {CONVERSATION_REDUCER_ACTIONS} from 'components/apps/Messages/reducers/conversationReducer/types';

export const SnapshotBubble: FC<
  DigestedConversationSnapShotItemType & {
    index: number;
    scrollHandler: SharedValue<number>;
    scrollRef: React.RefObject<Animated.ScrollView>;
    group?: boolean;
  }
> = props => {
  const messageContext = useContext(MessagesContext);
  const snapshotContext = useContext(SnapShotContext);

  const opacity = useSharedValue(props.content.image ? 1 : 0);
  const [renderWaiting, setRenderWaiting] = useState(true);
  const [image, setImage] = useState<SkImage | undefined>(props.content.image);

  const clip = BubblePath(props.width, props.height, 16, true);

  const opacityStyle = useAnimatedStyle(() => {
    return {opacity: opacity.value};
  });

  useEffect(() => {
    if (!image) {
      snapshotContext.takeSnapShot.set(props.content.filename);
    }
  });

  useEffect(() => {
    if (snapshotContext.takeSnapShot && snapshotContext.image) {
      const snapshotImage = snapshotContext.image;
      const aspectRation = snapshotImage.height() / snapshotImage.width();
      const imageHeight = props.width * aspectRation;
      messageContext.conversation.dispatch({
        type: CONVERSATION_REDUCER_ACTIONS.UPDATE_MESSAGE,
        payload: {
          index: props.index,
          props: {
            content: {
              image: snapshotImage,
              filename: props.content.filename,
              backup: props.content.backup,
            },
            height: imageHeight,
          },
        },
      });
      setImage(snapshotContext.image);
    }
  }, [snapshotContext.takeSnapShot, snapshotContext.image]);

  useEffect(() => {
    if (!renderWaiting) {
      //context.showNextMessage();
    }
  }, [renderWaiting]);

  useEffect(() => {
    if (
      image &&
      !snapshotContext.indicatorRunning.state &&
      props.messageDelay
    ) {
      //context.scrollTo.set(-1);
      opacity.value = withTiming(1, {duration: 300}, finished => {
        if (finished) {
          runOnJS(setRenderWaiting)(false);
        }
      });
    }
  }, [image, snapshotContext.indicatorRunning.state]);

  return (
    <View style={{height: props.height}}>
      <Animated.View style={[styles.main, opacityStyle]}>
        <SnapshotBubbleRenderer {...props} clip={clip} image={image} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  waiting: {
    position: 'absolute',
  },
  main: {},
});
