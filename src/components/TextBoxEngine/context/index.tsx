import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  TextBoxEngineContextTypeDigested,
  TextBoxEngineContextTypeDigest,
  TextBoxDialoguesType,
  DigestedDialoguesType,
} from './types';
import {EventOrchestraContext} from 'components/EventOrchestra/context';
import {testScript} from '../assets/scripts/test';
import {getDimensionsAndSkiaGlyphs} from '../utility';
import {SkFont} from '@shopify/react-native-skia';
import {ApplicationContext} from 'context';

const digestDialogue = (state: TextBoxDialoguesType, textFont: SkFont) => {
  const digest = {
    id: state.id,
    configuration: state.screenConfiguration,
    dialogues: state.dialogues.map(dialogue => {
      return {
        name: dialogue.name,
        glyphs: getDimensionsAndSkiaGlyphs(textFont, dialogue.content, 500, 18),
      };
    }),
  };
  return digest;
};
//defaults for empty app
export const TextBoxEngineContext =
  React.createContext<TextBoxEngineContextTypeDigested>({});

const TextBoxEngineContextProvider: FC<
  TextBoxEngineContextTypeDigest
> = props => {
  const [dialogues, _setDialogue] = useState<DigestedDialoguesType>();
  const [currentScreenIndex, setCurrentScreenIndex] = useState<number>(-1);
  const [nextScreen, setNextScreen] = useState(false);

  const eventOrchestra = useContext(EventOrchestraContext);
  const appContext = useContext(ApplicationContext);

  const font = appContext.fonts.SFPro;

  const setDigestDialogues = useCallback(
    (dialogue: TextBoxDialoguesType) => {
      _setDialogue(digestDialogue(dialogue, font));
    },
    [font],
  );

  useEffect(() => {
    // if (eventOrchestra.events.state.has('message-Zola-viewed')) {
    //   setDigestDialogues(testScript);
    // }
  }, [eventOrchestra.events.state, setDigestDialogues]);

  useEffect(() => {
    if (dialogues) {
      setCurrentScreenIndex(0);
    }
  }, [dialogues]);

  useEffect(() => {
    if (dialogues && nextScreen) {
      setCurrentScreenIndex(index =>
        index < dialogues.dialogues.length - 2 ? index + 1 : -1,
      );
      setNextScreen(false);
    }
  }, [dialogues, nextScreen]);

  return (
    <TextBoxEngineContext.Provider
      value={{
        dialogues: {state: dialogues, set: setDigestDialogues},
        currentScreen: dialogues?.dialogues[currentScreenIndex],
        setNextScreen: setNextScreen,
      }}>
      {props.children}
    </TextBoxEngineContext.Provider>
  );
};

export default TextBoxEngineContextProvider;
export const TextBoxEngineContextConsumer = TextBoxEngineContext.Consumer;
