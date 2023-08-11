import React, {FC, ReactElement, useContext, useMemo, useRef} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import theme from 'themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MessagesContext} from 'components/apps/Messages/context';
import {Row} from 'common/styles/layout';
import {Bold, P} from 'common/styles/StyledText';
import NewMessageInput from './NewMessageInput';
import {DigestedConversationType} from '../../context/types';
import {CONVERSATION_REDUCER_ACTIONS} from '../../reducers/conversationReducer/types';
import List from '../Show/List';
import RouteChooser from '../Show/RouteChooser';

const BACKGROUND_HEIGHT_VISIBLE = 30;

const NewMessage: FC = () => {
  const {height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const context = useContext(MessagesContext);
  const conversation = useRef<DigestedConversationType>();
  const prevChooser = useRef<ReactElement | undefined>();

  const show = useSharedValue(0);

  const animatedScrollRef = useAnimatedRef<Animated.ScrollView>();
  const footerHeight = useSharedValue(0);

  if (context.newMessage.state != null) {
    conversation.current = context.newMessage.state;
  }
  const AnimateMediaTop = useAnimatedStyle(() => {
    if (context.newMessage.state != null) {
      show.value = withTiming(1, {duration: 750}, () => {
        runOnJS(context.listCovered.set)(true);
      });
    } else {
      show.value = withTiming(0, {duration: 750}, () => {
        runOnJS(context.listCovered.set)(false);
      });
    }
    return {
      marginTop: interpolate(
        show.value,
        [0, 1],
        [height, BACKGROUND_HEIGHT_VISIBLE],
      ),
    };
  }, [context.newMessage.state]);

  const MemoizedRouteChooser = useMemo(() => {
    if (context.newMessage.state) {
      const node = (
        <RouteChooser
          dispatch={context.newMessage.dispatch}
          conversation={context.newMessage.state}
          footerHeight={footerHeight}
          animatedScrollRef={animatedScrollRef}
          key={`${context.newMessage.state.name}-chooser`}
        />
      );
      prevChooser.current = node;
      return node;
    } else {
      return prevChooser.current;
    }
  }, [
    animatedScrollRef,
    context.newMessage.dispatch,
    context.newMessage.state,
    footerHeight,
  ]);

  return (
    <Animated.View
      style={[
        {
          height: height - (insets.top + BACKGROUND_HEIGHT_VISIBLE),
          paddingBottom: insets.bottom,
          backgroundColor: '#cfcdcd',
        },
        styles.screen,
        AnimateMediaTop,
      ]}>
      <View style={styles.header}>
        <Row>
          <View style={styles.spacer} />
          <Bold style={styles.title}>New Message</Bold>
          <View style={styles.spacer}>
            <TouchableWithoutFeedback
              style={{}}
              onPress={() => {
                context.newMessage.dispatch({
                  type: CONVERSATION_REDUCER_ACTIONS.RESET,
                });
              }}>
              <P suppressHighlighting={true} style={styles.cancel}>
                Cancel
              </P>
            </TouchableWithoutFeedback>
          </View>
        </Row>
        <NewMessageInput contact={conversation.current?.name} />
      </View>
      <View style={{flex: 1, flexGrow: 1}}>
        {conversation.current && (
          <>
            <List
              animatedScrollRef={animatedScrollRef}
              conversation={conversation.current}
              dispatch={context.newMessage.dispatch}
              footerHeight={footerHeight}
              newMessage={true}
              key={conversation.current?.name}
            />
            {MemoizedRouteChooser}
          </>
        )}
      </View>
    </Animated.View>
  );
};

export default NewMessage;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#c9c7c7',
    flexGrow: 0,
    padding: theme.spacing.p1,
    borderTopRightRadius: theme.BorderRadius.small,
    borderTopLeftRadius: theme.BorderRadius.small,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  cancel: {
    fontSize: 12,
    color: 'blue',
    marginStart: 'auto',
    marginEnd: theme.spacing.p2,
  },
  doneContainer: {marginStart: 'auto'},
  imageContainer: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  row: {
    flexGrow: 0,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    paddingVertical: theme.spacing.p1,
    paddingHorizontal: theme.spacing.p1,
  },

  screen: {
    zIndex: 4,
    position: 'absolute',
    width: '100%',
  },
  spacer: {
    flex: 1,
  },
});
