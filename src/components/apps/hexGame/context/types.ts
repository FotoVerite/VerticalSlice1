import {PropsWithChildren, ReactNode} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {GenericStateType} from 'types/genericContextTypes';

export type HexSharedValuesType = {
  wordInputShake: SharedValue<number>;
  infoOpened: SharedValue<number>;
};

export type HexContextTypeDigest = {
  children: ReactNode;
  answers: string[];
  found: string[];
  letters: string[];
  points: number;
};

export type HexContextTypeDigested = PropsWithChildren<{
  answers: GenericStateType<Set<string>>;
  found: GenericStateType<Set<string>>;
  notification: GenericStateType<string>;
  letters: GenericStateType<string[]>;
  points: GenericStateType<number>;
  word: GenericStateType<string>;
}>;
