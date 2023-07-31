import React, {
  FC,
  ReactNode,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Animated from 'react-native-reanimated';

import MessageTextInput from './MessageTextInput';
import OptionList from './OptionList';

import {ConversationShowRefs} from '..';

import theme from 'themes';
import {MessageRouteType} from 'components/apps/Messages/context/types';
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from 'components/apps/Messages/reducers/conversationReducer/types';
import NoOption from './OptionList/NoOption';
import Option from './OptionList/Option';
import {EVENTS_REDUCER_ACTIONS} from 'components/EventOrchestra/reducers/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {EventOrchestraContext} from 'components/EventOrchestra/context';

const MessageInput: FC<
  ConversationShowRefs & {
    availableRoute?: MessageRouteType;
    name?: CONTACT_NAMES;
    dispatch: (action: ConversationReducerActionsType) => Promise<void>;
  }
> = ({
  availableRoute: activeRoute,
  name,
  footerHeight,
  animatedScrollRef,
  dispatch,
}) => {
  const eventDispatch = useContext(EventOrchestraContext).events.dispatch;
  const [active, _setActive] = useState(false);

  const {width} = useWindowDimensions();

  const setActive = useCallback((state: boolean) => {
    _setActive(state);
  }, []);

  useEffect(() => {
    if (!name) {
      setActive(false);
    }
  }, [name, setActive]);

  const previousOptions = useRef<ReactNode[]>();

  const options = useMemo(() => {
    if (name == null) {
      return previousOptions.current;
    }
    if (activeRoute != null && name != null) {
      const nodes = activeRoute.options.map(option => (
        <Option
          key={`${activeRoute.routes.id}-${option}`}
          id={activeRoute.id}
          option={option}
          cb={() => {
            setActive(false);
            eventDispatch({
              type: EVENTS_REDUCER_ACTIONS.MESSAGE_APP_ROUTE_SEEN,
              payload: {routeId: activeRoute.id, chosen: option, name: name},
            });
            dispatch({
              type: CONVERSATION_REDUCER_ACTIONS.START_ROUTE,
              payload: {id: activeRoute.id, chosenOption: option},
            });
          }}
        />
      ));
      previousOptions.current = nodes;
      return nodes;
    } else {
      const nodes = [<NoOption setActive={setActive} />];
      previousOptions.current = nodes;
    }
  }, [activeRoute, dispatch, eventDispatch, name, setActive]);

  return (
    <Animated.View style={[{width: width}, styles.container]}>
      <BlurView style={styles.blur} blurType="light" blurAmount={5} />
      <MessageTextInput
        active={active}
        setActive={setActive}
        hasRoute={activeRoute != null}
      />
      <OptionList
        active={active}
        setActive={setActive}
        footerHeight={footerHeight}
        animatedScrollRef={animatedScrollRef}>
        {options}
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
