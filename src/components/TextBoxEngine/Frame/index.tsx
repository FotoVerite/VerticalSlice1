import React, {FC} from 'react';
import {
  Group,
  RoundedRect,
  SkFont,
  Skia,
  Text,
  rect,
} from '@shopify/react-native-skia';
import theme from 'themes';
import {FrameConfigurationType} from '../Screen/types';

const Frame: FC<{
  color: color;
  font: SkFont;
  frameConfiguration: FrameConfigurationType;
  name: string;
}> = ({color, frameConfiguration, font, name}) => {
  const {x, y, width, height, radius} = frameConfiguration;

  const fontInstance = Skia.Font(font.getTypeface(), 24);

  const nameClip = rect(
    x + theme.spacing.p4 - 3,
    y - 3,
    font?.getTextWidth(name) + 9,
    25,
  );

  return (
    <Group>
      <RoundedRect
        clip={nameClip}
        x={x}
        y={y}
        height={height}
        width={width}
        r={radius}
        invertClip={true}
        style="stroke"
        strokeWidth={3}
        color="lightgrey"
      />
      <Text
        color={'white'}
        x={x + theme.spacing.p4}
        y={y + 8}
        text={name}
        font={fontInstance}
      />
    </Group>
  );
};

export default Frame;
