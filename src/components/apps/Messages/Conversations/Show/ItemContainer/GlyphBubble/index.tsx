/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-bitwise */
import React, {FC} from 'react';
import {Image, View, useWindowDimensions} from 'react-native';

import {
  Canvas,
  DiscretePathEffect,
  Glyphs,
  Group,
  LinearGradient,
  Path1DPathEffect,
  Rect,
  useClockValue,
  useComputedValue,
  vec,
} from '@shopify/react-native-skia';

import {
  SharedValue,
  interpolateColor,
  useDerivedValue,
} from 'react-native-reanimated';
import {Row} from 'components/common/layout';
import {StyleSheet} from 'react-native';
import Reaction from '../Reaction';
import {DigestedConversationGlyphItemType} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

import theme from 'themes';
import {P} from 'components/common/StyledText';
import AnimatedGlyph from './AnimatedGlyph';
import {createNoise2D} from 'simplex-noise';

export const GlyphBubble: FC<
  DigestedConversationGlyphItemType & {
    scrollHandler: SharedValue<number>;
    group?: boolean;
  }
> = ({
  avatar,
  colors,
  scrollHandler,
  offset,
  content,
  leftSide,
  width,
  height,
  clip,
  name,
  reaction,
  group,
}) => {
  const COLOR_CHANGE_HEIGHT = useWindowDimensions().height / 2;
  const currentlyFromTop = useDerivedValue(() => {
    return Math.max(
      0,
      Math.min(offset - scrollHandler.value, COLOR_CHANGE_HEIGHT),
    );
  }, [scrollHandler]);

  const darkenedColor1 = changeColor(colors[0], leftSide ? -100 : -25);
  const darkenedColor2 = changeColor(colors[1], leftSide ? -100 : 20);

  const computedColors = useDerivedValue(() => {
    const color1 = interpolateColor(
      currentlyFromTop.value,
      [0, COLOR_CHANGE_HEIGHT],
      [colors[0], darkenedColor1],
    );

    const color2 = interpolateColor(
      currentlyFromTop.value,
      [0, COLOR_CHANGE_HEIGHT],
      [colors[1], darkenedColor2],
    );
    return [color1, color2];
  }, [currentlyFromTop]);

  const clock = useClockValue();

  const noise2D = createNoise2D();
  const deviation = useComputedValue(() => {
    return 20 * noise2D(20, clock.current * 0.0005);
  }, [clock]);
  return (
    <Row
      style={{
        alignItems: 'flex-end',
        padding: 0,
        margin: 0,
      }}>
      {leftSide && (
        <View style={styles.avatarContainer}>
          {avatar && <Image source={avatar} style={styles.avatar} />}
        </View>
      )}
      <View>
        {group && name != 'Self' && (
          <P size="s" style={{marginLeft: 20}}>
            {name}
          </P>
        )}

        {reaction && (
          <Reaction reaction={reaction} left={leftSide} colors={colors} />
        )}
        <Canvas
          style={{
            width: width,
            height: height,
          }}>
          <Group clip={clip}>
            <Rect x={0} y={0} width={width} height={height}>
              <LinearGradient
                colors={computedColors}
                start={vec(0, 0)}
                end={vec(0, height)}
              />
            </Rect>
          </Group>
          {content.text.glyphs.map((glyph, idx) => (
            <AnimatedGlyph
              font={content.text.font}
              glyph={glyph}
              clock={clock}
              key={`${glyph}-${idx}`}
            />
          ))}
        </Canvas>
      </View>
    </Row>
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

const changeColor = (color: string, amount: number) => {
  const clamp = (val: number) => Math.min(Math.max(val, 0), 0xff);
  const fill = (str: string) => ('00' + str).slice(-2);

  const num = parseInt(color.substr(1), 16);
  const red = clamp((num >> 16) + amount);
  const green = clamp(((num >> 8) & 0x00ff) + amount);
  const blue = clamp((num & 0x0000ff) + amount);
  return (
    '#' +
    fill(red.toString(16)) +
    fill(green.toString(16)) +
    fill(blue.toString(16))
  );
};
