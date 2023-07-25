import React, {
  FC,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import {
  ConversationType,
  MessagesContextTypeDigest,
  MessagesContextTypeDigested,
} from './types';
import {zola} from '../assets/messages/zola';
import {chris} from '../assets/messages/chris';
import {useWindowDimensions} from 'react-native';
import context, {ApplicationContext} from 'context';
import {seamless} from '../assets/messages/seamless';
import {movieNight} from '../assets/messages/movie_night';
import {clay} from '../assets/messages/clay';
import {grace_russo} from '../assets/messages/grace_russo';
import {alice} from '../assets/messages/alice';
import {mileena} from '../assets/messages/mileena';
import {greg} from '../assets/messages/greg';
import {EventOrchestraContext} from 'components/EventOrchestra/context';
import {steveLitt} from '../assets/messages/steve_litt';
import createConversationReducer from '../reducers/conversationReducer';
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from '../reducers/conversationReducer/types';
import {digestConversation} from '../reducers/conversationReducer/digestion';
import {CONTACT_NAMES} from './usersMapping';
import {testConvo} from '../assets/messages/test';
import {testConvo2} from '../assets/messages/test2';
import {
  viewableConversations,
  conversationHasExchange,
  sortConversations,
  sendNotification,
} from './conversationFunctions';
import {NotificationsContext} from 'components/Notifications/context';
import {spam1} from '../assets/messages/spam1';

//defaults for empty app
export const MessagesContext = React.createContext<MessagesContextTypeDigested>(
  {},
);
const conversations = [zola, greg, spam1];

export const baseConversation: ConversationType = {
  name: '',
  tags: [],
  exchanges: [],
};

const MessagesContextProvider: FC<MessagesContextTypeDigest> = props => {
  const applicationContext = useContext(ApplicationContext);
  const eventContext = useContext(EventOrchestraContext);
  const notificationContext = useContext(NotificationsContext);

  const setTheEvent = eventContext.events.set;
  const events = eventContext.events.state;
  const setViewEvent = useCallback(
    (name: CONTACT_NAMES) =>
      setTheEvent(_events => {
        const newState = Object.assign({}, _events);
        const views = newState.Message[name].views;
        views.push(new Date());
        return newState;
      }),
    [setTheEvent],
  );

  const setPathAsSeen = useCallback(
    (_name: CONTACT_NAMES, _id: number, chosen?: string) => {
      setTheEvent(state => {
        const newState = Object.assign({}, state);
        const seenRoutes = newState.Message[_name].routes;
        seenRoutes[_id] = {
          chosen: chosen ? chosen.toString() : undefined,
          date: new Date(),
          position: Object.keys(seenRoutes).length + 1,
        };
        return newState;
      });
    },
    [setTheEvent],
  );

  const [media, setMedia] = useState<ReactElement>();

  const filteredConversations = useMemo(
    () =>
      conversations
        .filter(viewableConversations(events))
        .filter(c => conversationHasExchange(c, events))
        .sort(sortConversations(events)),
    [events],
  );

  const [prevConversations, setPreConversations] = useState(
    filteredConversations,
  );

  const {width, _} = useWindowDimensions();

  const config = useMemo(() => {
    return {
      font: applicationContext.fonts.HelveticaNeue,
      emojiFont: applicationContext.fonts.NotoColor,
      events: events,
      width: width,
    };
  }, [
    applicationContext.fonts.HelveticaNeue,
    applicationContext.fonts.NotoColor,
    events,
    width,
  ]);

  const [conversation, dispatchConversation] = useReducer(
    createConversationReducer(config),
    undefined,
  );

  const [newMessage, dispatchNewMessage] = useReducer(
    createConversationReducer(config),
    undefined,
  );

  const reducerResolver = useCallback(
    async (action: ConversationReducerActionsType) => {
      if (action.type === CONVERSATION_REDUCER_ACTIONS.DIGEST_CONVERSATION) {
        const digested = await digestConversation(config, action.payload);
        dispatchConversation({
          type: CONVERSATION_REDUCER_ACTIONS.ADD_CONVERSATION,
          payload: digested,
        });
      } else {
        dispatchConversation(action);
      }
    },
    [config],
  );

  const newMessageResolver = useCallback(
    async (action: ConversationReducerActionsType) => {
      if (action.type === CONVERSATION_REDUCER_ACTIONS.DIGEST_CONVERSATION) {
        const digested = await digestConversation(config, action.payload);
        dispatchNewMessage({
          type: CONVERSATION_REDUCER_ACTIONS.ADD_CONVERSATION,
          payload: digested,
        });
      } else {
        dispatchNewMessage(action);
      }
    },
    [config],
  );

  const viewable = useMemo(
    () => conversations.filter(viewableConversations(events)),
    [events],
  );

  useEffect(() => {
    if (conversation?.name != null) {
      setViewEvent(conversation.name);
    }
  }, [conversation?.name, setViewEvent]);

  useEffect(() => {
    console.log(viewable.map(view => view.name));
    if (prevConversations && prevConversations !== viewable) {
      const newConversations = viewable.filter(
        c => !prevConversations.includes(c),
      );
      console.log(newConversations);
      newConversations.forEach(c => {
        if (c.name !== newMessage?.name && c.name !== conversation?.name) {
          sendNotification(
            c,
            events,
            setTheEvent,
            notificationContext.notifications.dispatch,
          );
        }
      });
      setPreConversations(viewable);
    }
  }, [
    viewable,
    events,
    prevConversations,
    newMessage?.name,
    conversation?.name,
    notificationContext.notifications.dispatch,
    setTheEvent,
  ]);

  return (
    <MessagesContext.Provider
      value={{
        conversations: filteredConversations,
        media: {
          state: media,
          set: setMedia,
        },
        newMessage: {
          state: newMessage,
          dispatch: newMessageResolver,
        },
        conversation: {
          state: conversation,
          dispatch: reducerResolver,
        },
      }}>
      {props.children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
export const MessagesContextConsumer = MessagesContext.Consumer;
