import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {DigestedConversationEmojiItemType} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

export const EmojiBubble: FC<DigestedConversationEmojiItemType> = ({
  content,
  height,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          height: height,
        },
      ]}>
      <Text style={styles.emoji}>{content}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  emoji: {
    fontSize: 50,
  },
});
