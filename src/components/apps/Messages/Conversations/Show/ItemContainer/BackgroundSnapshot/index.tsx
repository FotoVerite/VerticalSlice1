import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';

import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import {DigestedConversationBackgroundSnapShotItemType} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

import {getSnapshotPath} from 'components/Snapshot/context';
import {BubblePath} from 'components/apps/Messages/reducers/conversationReducer/digestion/BubblePath';
import {BackgroundSnapshotRenderer} from './BackgroundSnapshotRenderer';
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from 'components/apps/Messages/reducers/conversationReducer/types';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {SkImage, Skia} from '@shopify/react-native-skia';

export const BackgroundSnapshotBubble: FC<
  DigestedConversationBackgroundSnapShotItemType & {
    dispatch: (action: ConversationReducerActionsType) => Promise<void>;
    index: number;
    scrollHandler: SharedValue<number>;
    scrollRef: React.RefObject<Animated.ScrollView>;
    group?: boolean;
  }
> = props => {
  const {content, dispatch, index, width} = props;
  const {backup, image, filename} = content;
  const [resolvedImage, setResolvedImage] = useState<
    SkImage | null | undefined
  >(image);

  const opacity = useSharedValue(image ? 1 : 0);
  const [renderWaiting, setRenderWaiting] = useState(true);

  const clip = BubblePath(props.width, props.height, 16, true);

  const opacityStyle = useAnimatedStyle(() => {
    return {opacity: opacity.value};
  });

  useEffect(() => {
    const resolveImage = async () => {
      const path = getSnapshotPath(filename);
      const data = await ReactNativeBlobUtil.fs.readFile(path, 'base64');
      if (data != null) {
        setResolvedImage(
          Skia.Image.MakeImageFromEncoded(Skia.Data.fromBase64(data)),
        );
      }
    };
    if (!image) {
      resolveImage();
    }
  }, [filename, image]);

  useEffect(() => {
    if (resolvedImage && !image) {
      const aspectRation = resolvedImage.height() / resolvedImage.width();
      const imageHeight = width * aspectRation;
      dispatch({
        type: CONVERSATION_REDUCER_ACTIONS.UPDATE_MESSAGE,
        payload: {
          index: index,
          props: {
            content: {
              image: resolvedImage,
              filename: filename,
              backup: backup,
            },
            height: imageHeight,
          },
        },
      });
    }
  }, [width, dispatch, index, filename, backup, image, resolvedImage]);

  useEffect(() => {
    if (!renderWaiting && props.messageDelay) {
      dispatch({type: CONVERSATION_REDUCER_ACTIONS.CONTINUE_ROUTE});
    }
  }, [dispatch, renderWaiting, props.messageDelay]);

  useEffect(() => {
    if (image && resolvedImage && props.messageDelay) {
      props.scrollRef.current?.scrollToOffset({
        offset: props.scrollHandler.value + props.height,
        animated: true,
      });
      opacity.value = withTiming(1, {duration: 300}, finished => {
        if (finished) {
          runOnJS(setRenderWaiting)(false);
        }
      });
    }
  }, [
    image,
    opacity,
    props.height,
    props.messageDelay,
    props.scrollHandler.value,
    props.scrollRef,
    resolvedImage,
  ]);
  return (
    <View style={{height: props.height}}>
      <Animated.View style={[styles.main, opacityStyle]}>
        <BackgroundSnapshotRenderer {...props} clip={clip} image={image} />
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
