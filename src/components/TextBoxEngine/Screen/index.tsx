import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {
  BackdropFilter,
  Blur,
  Canvas,
  Fill,
  Glyph,
  Group,
  Image,
  SkImage,
  Skia,
  rect,
  rrect,
} from '@shopify/react-native-skia';
import {TextBoxEngineContext} from '../context';
import {useSharedValue, withDelay, withTiming} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ApplicationContext} from 'context';
import Frame from '../Frame';
import {generateFrameDimensions} from '../utility';
import {DigestedDialogueType} from '..';
import {TextBoxScreenConfiguration} from '../context/types';
import TextBoxDisplay from '../Display';

const TextBoxScreen: FC<{
  background: SkImage;
  configuration: TextBoxScreenConfiguration;
  dialogues: DigestedDialogueType[];
}> = ({background, configuration, dialogues}) => {
  const textBoxEngineContext = useContext(TextBoxEngineContext);
  const applicationContext = useContext(ApplicationContext);
  const {width, height} = useWindowDimensions();
  const opacity = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const font = applicationContext.fonts.SFPro;
  const textFont = Skia.Font(font.getTypeface() || undefined, 20);
  const [screens, setScreens] = useState<{name: string; glyphs: Glyph[]}[]>([]);

  useEffect(() => {
    opacity.value = withDelay(0, withTiming(1, {duration: 1000}));
  }, [configuration?.fadeInDelay, opacity]);

  useEffect(() => {
    setScreens(s => {
      if (textBoxEngineContext.currentScreen) {
        return s.concat(textBoxEngineContext.currentScreen);
      } else {
        return s;
      }
    });
  }, [textBoxEngineContext.currentScreen]);

  const frameConfiguration = generateFrameDimensions(
    font,
    width,
    height,
    insets.bottom,
  );
  const rounded = 15;
  const textBoxRect = rect(
    frameConfiguration.x,
    frameConfiguration.y,
    frameConfiguration.width,
    frameConfiguration.height,
  );

  const textBoxRectRoundClip = rrect(textBoxRect, rounded, rounded);

  const styles = StyleSheet.create({
    canvas: {
      position: 'absolute',
      height: height,
      width: width,
      zIndex: 100,
    },
  });

  const currentScreen = screens[0];
  return (
    <Canvas style={[styles.canvas]}>
      <Image
        image={background}
        x={0}
        y={0}
        width={width}
        height={height}
        opacity={opacity}
        fit="cover"
      />
      <BackdropFilter opacity={opacity} filter={<Blur blur={5} />}>
        <Fill color="rgba(125, 125, 125, 0.3)" />
      </BackdropFilter>
      {currentScreen && (
        <>
          <Group clip={textBoxRectRoundClip}>
            <BackdropFilter opacity={opacity} filter={<Blur blur={25} />}>
              <Fill color="rgba(125, 125, 125, 0.3)" />
            </BackdropFilter>
          </Group>
          <Frame
            color={'white'}
            font={font}
            frameConfiguration={frameConfiguration}
            name={currentScreen.name}
          />
          <TextBoxDisplay
            font={textFont}
            frameConfiguration={frameConfiguration}
            glyphs={currentScreen.glyphs}
            setNextScreen={textBoxEngineContext.setNextScreen}
          />
        </>
      )}
    </Canvas>
  );
};

export default TextBoxScreen;
