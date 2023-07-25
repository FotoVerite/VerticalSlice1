import React, {FC, useEffect, useState} from 'react';
import {
  ApplicationContextTypeDigest,
  ApplicationContextTypeDigested,
  skFontMap,
} from './types';

//defaults for empty app
export const ApplicationContext =
  React.createContext<ApplicationContextTypeDigested>({});

const ApplicationContextProvider: FC<ApplicationContextTypeDigest> = props => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    _loadSettings();
  });

  const _loadSettings = async () => {
    // const SFPro = await useFont(
    //   require('@applicationAssets/fonts/SFPro.ttf'),
    //   16,
    // );
    // fonts.set('SFPro', SFPro);
    // const NotoColor = await useFont(
    //   require('@applicationAssets/fonts/NotoColorEmoji.ttf'),
    //   16,
    // );
    // fonts.set('NotoColor', NotoColor);
    // const HelveticaNeue = await useFont(
    //   require('@applicationAssets/fonts/HelveticaNeue.ttf'),
    //   16,
    // );
    // fonts.set('HelveticaNeue', HelveticaNeue);
    // setReady(true);
  };

  return (
    <ApplicationContext.Provider
      value={{
        fonts: props.fonts,
        ready: ready,
      }}>
      {props.children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
export const ApplicationContextConsumer = ApplicationContext.Consumer;
