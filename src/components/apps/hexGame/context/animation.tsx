import React, {FC, ReactNode} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {HexSharedValuesType} from './types';

//defaults for empty app
export const HexSharedValues = React.createContext<HexSharedValuesType>({});

const HexSharedValuesProvider: FC<{children: ReactNode}> = props => {
  const wordInputShake = useSharedValue(0);
  const infoOpened = useSharedValue(0);

  return (
    <HexSharedValues.Provider
      value={{
        wordInputShake: wordInputShake,
        infoOpened: infoOpened,
      }}>
      {props.children}
    </HexSharedValues.Provider>
  );
};

export default HexSharedValuesProvider;
export const HexAnimationConsumer = HexSharedValues.Consumer;
