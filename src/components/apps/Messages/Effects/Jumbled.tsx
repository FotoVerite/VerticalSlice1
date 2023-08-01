/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-bitwise */
import React, {FC, useContext} from 'react';

import {
  Canvas,
  useClockValue,
  useComputedValue,
} from '@shopify/react-native-skia';

import {StyleSheet, View} from 'react-native';

import theme from 'themes';
import {createNoise2D} from 'simplex-noise';
import {GetDimensionsAndSkiaNodes} from '../reducers/conversationReducer/digestion/skiaCalculations';
import AnimatedGlyph from '../Conversations/Show/ItemContainer/GlyphBubble/AnimatedGlyph';
import {ApplicationContext} from 'context';
import {getDimensionsAndSkiaGlyphs} from 'components/TextBoxEngine/utility';

export const Jumbled: FC<{message: string}> = ({message}) => {
  const appContext = useContext(ApplicationContext);
  const glyphs = getDimensionsAndSkiaGlyphs(
    appContext.fonts.SFPro,
    message,
    200,
    13,
  );
  const clock = useClockValue();

  // const noise2D = createNoise2D();
  //   const deviation = useComputedValue(() => {
  //     return 20 * noise2D(20, clock.current * 0.0005);
  //   }, [clock]);
  return (
    <Canvas
      style={{
        width: 200,
        height: 100,
        top: theme.spacing.p1,
        position: 'absolute',
      }}>
      {glyphs.map((glyph, idx) => (
        <AnimatedGlyph
          font={appContext.fonts.SFPro}
          glyph={glyph}
          clock={clock}
          key={`${glyph}-${idx}`}
        />
      ))}
    </Canvas>
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
