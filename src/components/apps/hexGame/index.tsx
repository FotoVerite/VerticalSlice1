import React, {FC} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import InfoScreen from './infoScreen';
import Header from './Header';
import HexContextProvider from './context';
import {HexContextTypeDigest} from './context/types';
import HexSharedValuesProvider from './context/animation';
import GameScreen from './GameScreen';
import Notification from './Notification';

const Hex: FC<HexContextTypeDigest> = ({answers, letters}) => {
  return (
    <HexContextProvider
      answers={answers}
      letters={letters}
      found={[]}
      points={0}>
      <HexSharedValuesProvider>
        <InfoScreen />
        <SafeAreaView style={styles.layout}>
          <View style={styles.layout}>
            <Header />
            <GameScreen />
            <Notification />
          </View>
        </SafeAreaView>
      </HexSharedValuesProvider>
    </HexContextProvider>
  );
};

export default Hex;

const styles = StyleSheet.create({
  layout: {
    backgroundColor: 'black',
    flexGrow: 1,
  },
});
