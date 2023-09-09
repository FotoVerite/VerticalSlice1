/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import Messages from 'components/apps/Messages';
import ApplicationContextProvider from 'context';
import {skFontRecords} from 'context/types';
import {useFont} from '@shopify/react-native-skia';
import TextBoxEngine from 'components/TextBoxEngine';
import TextBoxEngineContextProvider from 'components/TextBoxEngine/context';
import {View} from 'react-native';
import EventOrchestraContextProvider from 'components/EventOrchestra/context';
import SnapShotContextProvider from 'components/Snapshot/context';
import SnapshotView from 'components/Snapshot';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Notifications from 'components/Notifications';
import SplashScreen from 'react-native-splash-screen';

function App(): JSX.Element {
  const SFPro = useFont(require('@applicationAssets/fonts/SFPro.ttf'), 16);
  const NotoColor = useFont(
    require('@applicationAssets/fonts/NotoColorEmoji.ttf'),
    16,
  );
  const HelveticaNeue = useFont(
    require('@applicationAssets/fonts/HelveticaNeue.ttf'),
    16,
  );
  const screenRef = useRef<View>(null);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (!SFPro || !NotoColor || !HelveticaNeue) {
    return <></>;
  } else {
    const skFontRecord: skFontRecords = {
      ['SFPro']: SFPro,
      ['NotoColor']: NotoColor,
      ['HelveticaNeue']: HelveticaNeue,
    };
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <ApplicationContextProvider fonts={skFontRecord}>
            <EventOrchestraContextProvider>
              <TextBoxEngineContextProvider>
                <NavigationContainer>
                  <SnapShotContextProvider snapShotRef={screenRef}>
                    <Notifications>
                      <SnapshotView snapshotRef={screenRef}>
                        <Messages />
                      </SnapshotView>
                    </Notifications>
                  </SnapShotContextProvider>
                </NavigationContainer>
                <TextBoxEngine screenRef={screenRef} />
              </TextBoxEngineContextProvider>
            </EventOrchestraContextProvider>
          </ApplicationContextProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }
}

export default App;
