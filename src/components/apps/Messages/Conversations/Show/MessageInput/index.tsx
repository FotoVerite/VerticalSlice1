import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Animated from 'react-native-reanimated';

import MessageTextInput from './MessageTextInput';
import OptionList from './OptionList';

import {ConversationShowRefs} from '..';

import theme from 'themes';
import {DigestedConversationType} from 'components/apps/Messages/context/types';
import {ConversationReducerActionsType} from 'components/apps/Messages/reducers/conversationReducer/types';

const MessageInput: FC<
  ConversationShowRefs & {
    conversation?: DigestedConversationType;
    dispatch: (action: ConversationReducerActionsType) => Promise<void>;
  }
> = ({footerHeight, animatedScrollRef, conversation, dispatch}) => {
  const [activeRoute, setRoute] = useState(conversation?.availableRoute);
  const [name, setName] = useState(conversation?.name);

  const [active, _setActive] = useState(false);

  const {width} = useWindowDimensions();

  const setActive = useCallback((state: boolean) => {
    _setActive(state);
  }, []);

  useEffect(() => {
    if (!conversation) {
      setActive(false);
    }
  }, [conversation, setActive]);

  useEffect(() => {
    if (
      conversation &&
      (conversation.availableRoute == null ||
        activeRoute !== conversation.availableRoute)
    ) {
      setRoute(conversation.availableRoute);
    }
  }, [conversation, activeRoute]);

  useEffect(() => {
    if (conversation && name !== conversation.name) {
      setName(conversation.name);
    }
  }, [conversation, name]);

  return (
    <Animated.View style={[{width: width}, styles.container]}>
      <BlurView
        style={styles.blur}
        blurType="light"
        blurAmount={25}
        reducedTransparencyFallbackColor="white"
      />
      <MessageTextInput active={active} setActive={setActive} />
      <OptionList
        active={active}
        setActive={setActive}
        dispatch={dispatch}
        footerHeight={footerHeight}
        name={name}
        activeRoute={activeRoute}
        animatedScrollRef={animatedScrollRef}
      />
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
