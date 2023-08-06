import React, {FC, useEffect} from 'react';

import {StyleSheet} from 'react-native';
import {DigestedConversationTimeType} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

import {P} from 'common/styles/StyledText';
import {delayFor} from 'common';
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from 'components/apps/Messages/reducers/conversationReducer/types';

export const BlockTimeStamp: FC<
  DigestedConversationTimeType & {
    dispatch: (action: ConversationReducerActionsType) => Promise<void>;
  }
> = ({dispatch, height, messageDelay, content}) => {
  return <P style={[styles.time, {height: height}]}>{content}</P>;
};

const styles = StyleSheet.create({
  time: {
    margin: 0,
    marginTop: 0,
    fontSize: 10,
    textAlign: 'center',
  },
});
