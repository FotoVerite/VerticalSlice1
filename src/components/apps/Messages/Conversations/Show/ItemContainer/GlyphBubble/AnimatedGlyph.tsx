import React, {FC} from 'react';

import SimplexNoise, {createNoise2D} from 'simplex-noise';

import {
  Glyph,
  Glyphs,
  SkFont,
  SkiaClockValue,
  useComputedValue,
  vec,
} from '@shopify/react-native-skia';

const F = 0.0006;
const R = 125;
const A = 5;

const AnimatedGlyph: FC<{
  font: SkFont;
  glyph: Glyph;
  clock: SkiaClockValue;
}> = ({font, glyph, clock}) => {
  const {x, y} = glyph.pos;
  const noise2D = createNoise2D();
  const animatedGlyph = useComputedValue(() => {
    const xNoise = A * noise2D(x, clock.current * F);
    const yNoise = A * noise2D(y, clock.current * F);
    return [{id: glyph.id, pos: vec(x + xNoise, y + yNoise)}];
  }, [clock]);
  return (
    <Glyphs x={0} y={0} font={font} color={'white'} glyphs={animatedGlyph} />
  );
};

export default AnimatedGlyph;
