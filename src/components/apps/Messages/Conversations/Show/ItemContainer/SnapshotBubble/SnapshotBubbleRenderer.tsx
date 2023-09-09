import React, {FC, useContext} from 'react';
import {TouchableWithoutFeedback, View, StyleSheet} from 'react-native';

import {
  Canvas,
  Group,
  Image as SkiaImage,
  SkPath,
  SkImage,
} from '@shopify/react-native-skia';

import {MessagesContext} from 'components/apps/Messages/context';

import {DigestedConversationSnapShotItemType} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

import {MediaImageElement} from '../../MediaViewer';

import theme from 'themes';

export const SnapshotBubbleRenderer: FC<
  DigestedConversationSnapShotItemType & {clip: SkPath; image?: SkImage}
> = ({avatar, leftSide, width, height, reaction, colors, clip, image}) => {
  const context = useContext(MessagesContext);

  if (!image) {
    return null;
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        context.media.set(
          <MediaImageElement
            source={{
              uri: 'data:image/png;base64,' + image.encodeToBase64(),
            }}
            aspectRatio={width / height}
          />,
        );
      }}>
      <View>
        <Canvas
          style={[
            {
              width: width,
              height: height,
            },
          ]}>
          <Group clip={clip}>
            <SkiaImage
              image={image}
              fit="fill"
              x={0}
              y={0}
              width={width}
              height={height}
            />
          </Group>
        </Canvas>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
  time: {
    fontSize: 10,
    textAlign: 'center',
  },
});
