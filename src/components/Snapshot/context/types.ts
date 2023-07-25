import {SkImage} from '@shopify/react-native-skia';
import {PropsWithChildren, ReactNode} from 'react';
import {View} from 'react-native';
import {
  GenericOrUndefinedStateType,
  GenericStateType,
} from 'types/genericContextTypes';

export type SnapShotContextTypeDigest = {
  children: ReactNode;
  snapShotRef: React.RefObject<View>;
};

export type SnapShotContextTypeDigested = PropsWithChildren<{
  indicatorRunning: GenericStateType<boolean>;
  takeSnapShot: GenericOrUndefinedStateType<string>;
  takeBackground: GenericOrUndefinedStateType<boolean>;
  background: GenericOrUndefinedStateType<SkImage>;
  image: SkImage | null | undefined;
}>;
