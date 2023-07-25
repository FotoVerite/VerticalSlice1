import React from 'react';
import {SkImage, makeImageFromView} from '@shopify/react-native-skia';
import {FC, useContext, useEffect, useState} from 'react';
import {TextBoxEngineContext} from './context';
import Screen from './Screen';
import {delayFor} from 'common';
import {StyleSheet, View} from 'react-native';
import {GlyphContent} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

export type DigestedDialogueType = {name: string; glyphs: GlyphContent};

const TextBoxEngine: FC<{screenRef: any}> = ({screenRef}) => {
  const textBoxEngineContext = useContext(TextBoxEngineContext);

  const [background, setBackground] = useState<SkImage | null>(null);

  useEffect(() => {
    const takeSnapShot = async () => {
      const {configuration, id} = textBoxEngineContext.dialogues.state;
      if (screenRef.current && id != null) {
        if (configuration.fadeInDelay) {
          await delayFor(configuration.fadeInDelay);
        }
        const image = await makeImageFromView(screenRef);
        setBackground(image);
      }
    };
    if (textBoxEngineContext.dialogues.state) {
      takeSnapShot().catch(console.error);
    }
  }, [screenRef, textBoxEngineContext.dialogues.state]);

  if (!textBoxEngineContext.dialogues.state) {
    return null;
  }
  if (!background) {
    return <View style={styles.protector}></View>;
  } else {
    return <Screen background={background} />;
  }
};

export default TextBoxEngine;

const styles = StyleSheet.create({
  protector: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 100,
  },
});
