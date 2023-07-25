import {Glyph} from '@shopify/react-native-skia';
import {PropsWithChildren, ReactNode, RefObject} from 'react';
import {View} from 'react-native';
import {GenericOrUndefinedStateType} from 'types/genericContextTypes';

export type TextBoxScreenConfiguration = {
  startDelay?: number;
  fadeInDelay?: number;
};

export type TextBoxDialoguesType = {
  id: string;
  dialogues: DialogueType[];
  screenConfiguration: TextBoxScreenConfiguration;
};

export enum AnimatedOptions {
  STANDARD = 'standard',
}

export type DialogueType = {
  name: string;
  borderColor?: string;
  backgroundColor?: string;
  content: string;
  speed?: number;
  AnimatedOptions?: AnimatedOptions;
  cb?: () => void;
};
export type DigestedDialoguesType = {
  id: string;
  configuration: TextBoxScreenConfiguration;
  dialogues: {name: string; glyphs: Glyph[]}[];
};

export type TextBoxEngineContextTypeDigest = {
  children: ReactNode;
};

export type TextBoxEngineContextTypeDigested = PropsWithChildren<{
  dialogues: {state: DigestedDialoguesType; set: () => void};
  currentScreen?: {name: string; glyphs: Glyph[]};
  setNextScreen: React.Dispatch<React.SetStateAction<boolean>>;
}>;
