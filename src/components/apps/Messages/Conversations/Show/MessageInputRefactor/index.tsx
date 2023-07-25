import React, {
  FC,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Animated from 'react-native-reanimated';

import MessageTextInput from './MessageTextInput';
import OptionList from './OptionList';

import {ConversationShowRefs} from '..';

import {
  DigestedConversationType,
  MessageRouteType,
} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';

import theme from 'themes';
import {EventOrchestraContext} from 'components/EventOrchestra/context';
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from 'components/apps/Messages/reducers/conversationReducer/types';

export type RouteStateType =
  | {
      name: CONTACT_NAMES;
      route: MessageRouteType;
    }
  | undefined;

const MessageInput: FC<
  ConversationShowRefs & {
    conversation?: DigestedConversationType;
    dispatch: (action: ConversationReducerActionsType) => Promise<void>;
  }
> = ({footerHeight, animatedScrollRef, conversation, dispatch}) => {
  const eventSet = useContext(EventOrchestraContext).events.set;

  const setPathAsSeen = useCallback(
    (routeState: RouteStateType, chosen: string) => {
      if (!routeState) {
        return;
      }
      eventSet(state => {
        const newState = Object.assign({}, state);
        const seenRoutes = newState.Message[routeState.name].routes;
        seenRoutes[routeState.route.id] = {
          chosen: chosen.toString(),
          date: new Date(),
          position: Object.keys(seenRoutes).length + 1,
        };
        return newState;
      });
    },
    [eventSet],
  );

  const [active, _setActive] = useState(false);
  const [chosen, _setChosen] = useState<string>();
  const [route, _setRoute] = useState<RouteStateType>();

  const {width} = useWindowDimensions();

  const setActive = useCallback((state: boolean) => {
    _setActive(state);
  }, []);

  const setChosen = useCallback((state: string | undefined) => {
    _setChosen(state);
  }, []);

  const setRoute = useCallback(
    (state: DigestedConversationType | undefined) => {
      if (state && state.availableRoute) {
        _setRoute({name: state.name, route: state.availableRoute});
      }
    },
    [],
  );

  useEffect(() => {
    if (!conversation) {
      setActive(false);
    } else if (!route || route.route !== conversation.availableRoute) {
      setRoute(conversation);
    }
  }, [conversation, route, setActive, setRoute]);

  useEffect(() => {
    if (chosen && route) {
      setActive(false);
      setPathAsSeen(route, chosen);
      dispatch({
        type: CONVERSATION_REDUCER_ACTIONS.START_ROUTE,
        payload: {id: route.route.id, chosenOption: chosen},
      });
      setChosen(undefined);
    }
  }, [chosen, dispatch, route, setActive, setChosen, setPathAsSeen]);

  return (
    <Animated.View style={[{width: width}, styles.container]}>
      <BlurView
        style={styles.blur}
        blurType="light"
        blurAmount={25}
        reducedTransparencyFallbackColor="white"
      />
      <MessageTextInput active={active} setActive={setActive} chosen={chosen} />
      <OptionList
        active={active}
        setActive={setActive}
        setChosen={setChosen}
        footerHeight={footerHeight}
        animatedScrollRef={animatedScrollRef}
        route={route}
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
