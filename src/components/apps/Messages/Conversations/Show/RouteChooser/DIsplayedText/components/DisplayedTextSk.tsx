import React, {FC, ReactElement, useContext, useEffect} from 'react';

import {
  Canvas,
  Group,
  LinearGradient,
  Rect,
  SkFont,
  Text,
  Vector,
  interpolateColors,
  vec,
} from '@shopify/react-native-skia';

import {DigestedConversationStringItemType} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {ApplicationContext} from 'context';
import {generateSkiaNode} from 'components/apps/Messages/reducers/conversationReducer/digestion/skiaCalculations';
import {useWindowDimensions} from 'react-native';
import {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {BubblePath} from 'components/apps/Messages/reducers/conversationReducer/digestion/BubblePath';
import {
  CONTACT_NAMES,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';
export const DisplayedTextSk: FC<{
  numberOfLines: number;
  width: number;
  nodes: ReactElement[];
  cursorVector: Vector;
  font: SkFont;
  sent: SharedValue<number>;
  visibility: SharedValue<number>;
}> = ({sent, numberOfLines, width, nodes, cursorVector, font, visibility}) => {
  const shared = useSharedValue(-0.2);

  useEffect(() => {
    shared.value = withRepeat(withTiming(1, {duration: 500}), -1, true);
  }, [shared]);

  const textColor = useDerivedValue(() => {
    return interpolateColors(sent.value, [0, 1], ['black', 'white']);
  }, [sent]);

  const cursorOpacity = useDerivedValue(() => {
    return interpolate(sent.value, [0, 1], [1, 0]);
  }, [sent]);

  const clip = BubblePath(width, numberOfLines + 15, 16, true);

  return (
    <Canvas
      style={{
        height: numberOfLines + 15,
        width: width,
      }}>
      <Group opacity={visibility}>
        <Group clip={clip} opacity={sent}>
          <Rect x={0} y={0} width={width} height={numberOfLines + 15}>
            <LinearGradient
              colors={getColorFromContacts(CONTACT_NAMES.SELF)}
              start={vec(0, 0)}
              end={vec(0, numberOfLines + 15)}
            />
          </Rect>
        </Group>
        <Group color={textColor}>{nodes}</Group>
        <Group opacity={cursorOpacity}>
          <Text
            x={cursorVector.x}
            y={cursorVector.y}
            font={font}
            text={'|'}
            color={'blue'}
            opacity={shared}
          />
        </Group>
      </Group>
    </Canvas>
  );
};
