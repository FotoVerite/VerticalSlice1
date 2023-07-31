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
import {useWindowDimensions} from 'react-native';
import {ApplicationContext} from 'context';
import {greg} from '../assets/messages/greg';
import {EventOrchestraContext} from 'components/EventOrchestra/context';
import createConversationReducer from '../reducers/conversationReducer';
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from '../reducers/conversationReducer/types';
import {digestConversation} from '../reducers/conversationReducer/digestion';
import {CONTACT_NAMES} from './usersMapping';
import {
  viewableConversations,
  conversationHasExchange,
  sortConversations,
  sendNotification,
} from './conversationFunctions';
import {NotificationsContext} from 'components/Notifications/context';
import {spam1} from '../assets/messages/spam1';
import {micheal} from '../assets/messages/michael';
import {findAvailableRoutes} from '../reducers/conversationReducer/routing/available';
import {EVENTS_REDUCER_ACTIONS} from 'components/EventOrchestra/reducers/types';
import {mileena} from '../assets/messages/mileena';
import {chris} from '../assets/messages/chris';
import {customer_service} from '../assets/messages/customer_service';

//defaults for empty app
export const MessagesContext = React.createContext<MessagesContextTypeDigested>(
  {},
);
const conversations: ConversationType[] = [
  zola,
  spam1,
  micheal,
  chris,
  mileena,
  customer_service,
];

export const baseConversation: ConversationType = {
  name: '',
  tags: [],
  exchanges: [],
};

const MessagesContextProvider: FC<MessagesContextTypeDigest> = props => {
  const applicationContext = useContext(ApplicationContext);
  const eventContext = useContext(EventOrchestraContext);
  const notificationContext = useContext(NotificationsContext);

  const eventDispatch = eventContext.events.dispatch;
  const events = eventContext.events.state;

  const [media, setMedia] = useState<ReactElement>();

  const filteredConversations = useMemo(
    () =>
      conversations
        .filter(viewableConversations(events))
        .filter(c => conversationHasExchange(c, events))
        .map(c => {
          c.hasAvailableRoute =
            findAvailableRoutes(c.name, c.routes || [], events).length > 0;
          return c;
        })
        .sort(sortConversations(events)),
    [events],
  );

  const [prevConversations, setPreConversations] = useState(
    filteredConversations,
  );

  const {width} = useWindowDimensions();

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

  const viewable = useMemo(() => {
    const state = conversations.map(c => {
      return {...c};
    });
    return state.filter(viewableConversations(events)).map(_conversation => {
      const available = findAvailableRoutes(
        _conversation.name,
        _conversation.eventBasedRoutes || [],
        events,
      );
      _conversation.availableEventRoutes = available.map(a => a.id);
      return _conversation;
    });
  }, [events]);

  useEffect(() => {
    if (conversation?.name != null) {
      eventDispatch({
        type: EVENTS_REDUCER_ACTIONS.MESSAGE_APP_CONVERSATION_SEEN,
        payload: {name: conversation.name},
      });
    }
  }, [conversation?.name, eventDispatch]);

  useEffect(() => {
    const filterDispatchedEventRoutes = (
      _conversation: ConversationType,
      prev: ConversationType[],
    ) => {
      if (!_conversation.availableEventRoutes) {
        return false;
      }
      const seenIds =
        prev.find(p => p.name === _conversation.name)?.availableEventRoutes ||
        [];
      return (
        _conversation.availableEventRoutes?.filter(id => !seenIds.includes(id))
          .length > 0
      );
    };
    if (prevConversations && prevConversations !== viewable) {
      const preAvailableNames = prevConversations.map(c => c.name);
      const newConversations = viewable.filter(
        v =>
          !preAvailableNames.includes(v.name) ||
          filterDispatchedEventRoutes(v, prevConversations),
      );
      newConversations.forEach(c => {
        if (c.name !== newMessage?.name && c.name !== conversation?.name) {
          sendNotification(
            c,
            events,
            eventDispatch,
            notificationContext.notifications.dispatch,
          );
        }
      });
      setPreConversations(viewable);
    }
  }, [
    viewable,
    events,
    eventDispatch,
    prevConversations,
    newMessage?.name,
    conversation?.name,
    notificationContext.notifications.dispatch,
    reducerResolver,
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
