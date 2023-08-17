import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Platform, StyleSheet, useWindowDimensions} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Animated from 'react-native-reanimated';

import {ConversationShowRefs} from '..';

import theme from 'themes';
import {DigestedConversationType} from 'components/apps/Messages/context/types';
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from 'components/apps/Messages/reducers/conversationReducer/types';
import MessageTextInput from './MessageTextInput';
import {convertMessageToString} from 'components/apps/Messages/context/conversationFunctions';
import OptionList from './OptionList';
import Option from './OptionList/Option';

const MessageInput: FC<
  ConversationShowRefs & {
    conversation: DigestedConversationType;
    dispatch: (action: ConversationReducerActionsType) => void;
  }
> = ({conversation, footerHeight, animatedScrollRef, dispatch}) => {
  const [optionListOpen, openOptionList] = useState(false);
  const [chosenOption, setChosenOption] = useState<string>('...');

  const {width} = useWindowDimensions();

  const {nextMessageInQueue, availableRoute, chosenRoute} = conversation;

  useEffect(() => {
    setChosenOption('...');
  }, [conversation.exchanges, setChosenOption]);

  const displayedText = useMemo(() => {
    if (nextMessageInQueue) {
      return convertMessageToString(nextMessageInQueue);
    }
    if (availableRoute && chosenRoute == null) {
      const {options} = availableRoute;
      if (options.length === 1) {
        return options[0];
      } else {
        return chosenOption;
      }
    }
    return undefined;
  }, [nextMessageInQueue, availableRoute, chosenRoute, chosenOption]);

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
      } else if (chosenOption !== '...') {
        return dispatch({
          type: CONVERSATION_REDUCER_ACTIONS.START_ROUTE,
          payload: {chosenOption: chosenOption},
        });
      }
    }
    return () => {};
  }, [nextMessageInQueue, availableRoute, dispatch, chosenOption]);

  const Options = useMemo(() => {
    if (availableRoute) {
      const nodes = availableRoute.options.map(option => (
        <Option
          key={`${availableRoute.routes.id}-${option}`}
          id={availableRoute.id}
          option={option}
          cb={() => {
            openOptionList(false);
            setChosenOption(option);
          }}
        />
      ));
      return nodes;
    }
  }, [availableRoute]);

  return (
    <Animated.View style={[{width: width}, styles.container]}>
      {Platform.OS === 'ios' && (
        <BlurView style={styles.blur} blurType="light" blurAmount={5} />
      )}
      <MessageTextInput
        text={displayedText}
        cb={callback}
        openOptionList={openOptionList}
      />
      <OptionList
        optionListOpen={optionListOpen}
        setActive={openOptionList}
        footerHeight={footerHeight}
        animatedScrollRef={animatedScrollRef}>
        {Options}
      </OptionList>
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
    bottom: 0,
  },
  container: {
    zIndex: 3,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },

  icon: {
    marginStart: 'auto',
  },
});
