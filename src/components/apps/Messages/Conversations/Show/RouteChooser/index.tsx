import React, {FC, memo, useCallback, useMemo, useState} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Animated from 'react-native-reanimated';

import {ConversationShowRefs} from '..';

import theme from 'themes';
import {DigestedConversationType} from 'components/apps/Messages/context/types';
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from 'components/apps/Messages/reducers/conversationReducer/types';
import SingleOptionDisplay from './SingleOptionDisplay';
import {convertMessageToString} from 'components/apps/Messages/context/conversationFunctions';

const MessageInput: FC<
  ConversationShowRefs & {
    conversation: DigestedConversationType;
    dispatch: (action: ConversationReducerActionsType) => Promise<void>;
  }
> = ({conversation, footerHeight, animatedScrollRef, dispatch}) => {
  const [active, _setActive] = useState(false);

  const {width} = useWindowDimensions();

  const {nextMessageInQueue, availableRoute, activePath} = conversation;

  const displayedText = useMemo(() => {
    if (nextMessageInQueue) {
      return convertMessageToString(nextMessageInQueue);
    }
    if (availableRoute && activePath.length === 0) {
      const {options} = availableRoute;
      if (options.length === 1) {
        return options[0];
      } else {
        return '...';
      }
    }
    return undefined;
  }, [nextMessageInQueue, availableRoute, activePath]);

  const callback = useCallback(() => {
    if (nextMessageInQueue) {
      return dispatch({type: CONVERSATION_REDUCER_ACTIONS.CONTINUE_ROUTE});
    }
    if (availableRoute) {
      const {options} = availableRoute;
      if (options.length === 1) {
        return dispatch({
          type: CONVERSATION_REDUCER_ACTIONS.START_ROUTE,
          payload: {chosenOption: options[0]},
        });
      } else {
        return dispatch({type: CONVERSATION_REDUCER_ACTIONS.CONTINUE_ROUTE});
      }
    }
    return dispatch({type: CONVERSATION_REDUCER_ACTIONS.CONTINUE_ROUTE});
  }, [nextMessageInQueue, availableRoute]);

  return (
    <Animated.View style={[{width: width}, styles.container]}>
      <BlurView style={styles.blur} blurType="light" blurAmount={5} />
      <SingleOptionDisplay text={displayedText} cb={callback} />
    </Animated.View>
  );
};

export default memo(MessageInput);

const styles = StyleSheet.create({
  blur: {
    zIndex: 3,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    zIndex: 3,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  textInput: {
    maxHeight: 40,
    borderColor: '#dfdede',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: theme.BorderRadius.normal,
    height: 40,
    marginHorizontal: theme.spacing.p1,
    alignItems: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
    marginBottom: 2,
  },
  icon: {
    marginStart: 'auto',
  },
});
