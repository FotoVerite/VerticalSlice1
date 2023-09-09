import React, {FC, useContext} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';

import {
  Canvas,
  Group,
  Image as SkiaImage,
  SkPath,
  SkImage,
} from '@shopify/react-native-skia';

import {MessagesContext} from 'components/apps/Messages/context';

import {DigestedConversationBackgroundSnapShotItemType} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

import {MediaImageElement} from '../../MediaViewer';
import {getSnapshotPath} from 'components/Snapshot/context';

export const BackgroundSnapshotRenderer: FC<
  DigestedConversationBackgroundSnapShotItemType & {
    clip: SkPath;
    image?: SkImage;
  }
> = ({width, height, clip, image}) => {
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
