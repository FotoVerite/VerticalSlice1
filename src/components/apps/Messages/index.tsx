import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import MessagesContextProvider from './context';
import MediaView from './Conversations/Show/MediaViewer';
import NewMessage from './Conversations/NewMessage';
import MainScreen from './MainScreen';

const Messages: FC = () => {
  return (
    <MessagesContextProvider>
      <View style={[styles.layout]}>
        <MainScreen />
        <MediaView />
        <NewMessage />
      </View>
    </MessagesContextProvider>
  );
};

export default Messages;

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    backgroundColor: '#f1f1f1',
  },
});
