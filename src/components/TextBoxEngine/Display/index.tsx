import React, {FC, useCallback, useContext, useEffect, useState} from 'react';

import {Glyph, Glyphs, Group, SkFont} from '@shopify/react-native-skia';
import {FrameConfigurationType} from '../Screen/types';
import {
  runOnJS,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const GlyphBox: FC<{
  decrementAnimations: () => void;
  font: SkFont;
  frameConfiguration: FrameConfigurationType;
  glyph: Glyph;
  index: number;
}> = ({decrementAnimations, font, frameConfiguration, glyph, index}) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      index * 50,
      withTiming(1, {duration: 75}, finished => {
        if (finished) {
          runOnJS(decrementAnimations)();
        }
      }),
    );
  });

  return (
    <Group>
      <Glyphs
        x={frameConfiguration.x + 24}
        y={frameConfiguration.y + 24}
        opacity={opacity}
        font={font}
        color={'white'}
        glyphs={[glyph]}
      />
    </Group>
  );
};

const TextBoxDisplay: FC<{
  font: SkFont;
  frameConfiguration: FrameConfigurationType;
  glyphs: Glyph[];
  setNextScreen: React.Dispatch<React.SetStateAction<boolean>>;
}> = props => {
  const [animationRunning, setAnimationRunning] = useState(props.glyphs.length);
  const opacity = useSharedValue(1);
  const setNextScreen = props.setNextScreen;
  useEffect(() => {
    if (animationRunning === 0) {
      opacity.value = withDelay(
        500,
        withTiming(0, {duration: 1000}, finished => {
          if (finished) {
            runOnJS(setNextScreen)(true);
          }
        }),
      );
    }
  }, [animationRunning, opacity, setNextScreen]);

  const decrementAnimations = useCallback(() => {
    setAnimationRunning(c => (c -= 1));
  }, []);

  const MemoGlyphBoxes = React.useMemo(() => {
    const glyphs = props.glyphs.map((glyph, index) => {
      return (
        <GlyphBox
          {...props}
          glyph={glyph}
          index={index}
          key={`${index}-${glyph}-textbox`}
          decrementAnimations={decrementAnimations}
        />
      );
    });
    return <Group opacity={opacity}>{glyphs}</Group>;
  }, [props, decrementAnimations, opacity]);
  return MemoGlyphBoxes;
};

export default TextBoxDisplay;
