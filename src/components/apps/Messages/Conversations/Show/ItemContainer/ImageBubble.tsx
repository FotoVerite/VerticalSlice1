import React, {FC, useContext} from 'react';
import {
  ImageSourcePropType,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {
  Canvas,
  Group,
  useImage,
  Image as SkImage,
} from '@shopify/react-native-skia';

import {MessagesContext} from 'components/apps/Messages/context';
import {DigestedConversationImageItemType} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {MediaImageElement} from '../MediaViewer';

export const ImageBubble: FC<DigestedConversationImageItemType & {}> = ({
  content,
  width,
  height,
  clip,
}) => {
  const image = useImage(content);
  const context = useContext(MessagesContext);

  if (!image) {
    return null;
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        context.media.set(
          <MediaImageElement
            source={content as ImageSourcePropType}
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
            <SkImage
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
