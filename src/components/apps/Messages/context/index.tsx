import React, {
  FC,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  ConversationType,
  MessageType,
  MessagesContextTypeDigest,
  MessagesContextTypeDigested,
} from './types';
import {zola} from '../assets/messages/zola';
import {useWindowDimensions} from 'react-native';
import {ApplicationContext} from 'context';
import {EventOrchestraContext} from 'components/EventOrchestra/context';
import createConversationReducer from '../reducers/conversationReducer';
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from '../reducers/conversationReducer/types';
import {digestConversation} from '../reducers/conversationReducer/digestion';
import {
  viewableConversations,
  conversationHasExchange,
  sortConversations,
  sendNotification,
  determineLogLine,
  createSpam,
} from './conversationFunctions';
import {NotificationsContext} from 'components/Notifications/context';
import {spam1} from '../assets/messages/spam1';
import {micheal} from '../assets/messages/michael';
import {findAvailableRoutes} from '../reducers/conversationReducer/routing/available';
import {EventOrchestraObjectType} from 'components/EventOrchestra/reducers/types';
import {mileena} from '../assets/messages/mileena';
import {chris} from '../assets/messages/chris';
import {customer_service} from '../assets/messages/customer_service';
import {CONTACT_NAMES} from './usersMapping';
import {getUnfinishedRouteID} from '../reducers/conversationReducer/routing/seen';
import {leo} from '../assets/messages/leo';
import {lenny} from '../assets/messages/lenny';
import {spam2} from '../assets/messages/spam2';
import {produce} from 'immer';
import NotificationEmitter, {EMITTER_EVENTS} from 'emitter';
import {spam3} from '../assets/messages/spam3';

//defaults for empty app
export const MessagesContext = React.createContext<MessagesContextTypeDigested>(
  {},
);
const conversationStartingState: ConversationType[] = [
  zola,
  spam1,
  spam2,
  spam3,
  micheal,
  chris,
  mileena,
  customer_service,
  leo,
  lenny,
];

export const baseConversation: ConversationType = {
  name: '',
  tags: [],
  exchanges: [],
};

export type SendNotificationType = {
  conversation: ConversationType;
  routeID: string;
  message: MessageType;
};

const MessagesContextProvider: FC<MessagesContextTypeDigest> = props => {
  const applicationContext = useContext(ApplicationContext);
  const eventContext = useContext(EventOrchestraContext);
  const notificationContext = useContext(NotificationsContext);

  const eventDispatch = eventContext.events.dispatch;
  const events = eventContext.events.state;
  const [conversations, setConversations] = useState(conversationStartingState);
  const [media, setMedia] = useState<ReactElement>();
  const [listCovered, setListCovered] = useState<boolean>(false);
  const [sendNotifications, setSendNotifications] = useState<
    SendNotificationType[]
  >([]);
  const beganSpamAttack = useRef(false);

  const filteredConversations = useMemo(() => {
    const state = conversations.map(c => {
      return {...c};
    });
    return state
      .filter(viewableConversations(events))
      .filter(c => conversationHasExchange(c, events))
      .map(c => {
        c.hasAvailableRoute =
          findAvailableRoutes(c.name, c.routes || [], events).length > 0;
        c.logline = determineLogLine(c, events);
        return c;
      })
      .sort(sortConversations(events));
  }, [conversations, events]);

  const [prevConversations, setPreConversations] = useState(
    filteredConversations,
  );

  const {width} = useWindowDimensions();

  const config = useMemo(() => {
    return {
      font: applicationContext.fonts.HelveticaNeue,
      emojiFont: applicationContext.fonts.NotoColor,
      width: width,
    };
  }, [
    applicationContext.fonts.HelveticaNeue,
    applicationContext.fonts.NotoColor,
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
    (action: ConversationReducerActionsType) => {
      dispatchConversation(action);
    },
    [],
  );

  const digestConvo = useCallback(
    async (_conversation: ConversationType) => {
      const digested = await digestConversation(config, _conversation, events);
      dispatchConversation({
        type: CONVERSATION_REDUCER_ACTIONS.ADD_CONVERSATION,
        payload: digested,
      });
    },
    [config, events],
  );

  const newMessageResolver = useCallback(
    (action: ConversationReducerActionsType) => {
      dispatchNewMessage(action);
    },
    [],
  );

  const digestNewMessage = useCallback(
    async (_conversation: ConversationType) => {
      const digested = await digestConversation(config, _conversation, events);
      dispatchNewMessage({
        type: CONVERSATION_REDUCER_ACTIONS.ADD_CONVERSATION,
        payload: digested,
      });
    },
    [config, events],
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
  }, [conversations, events]);

  useEffect(() => {
    if (conversation?.eventAction != null) {
      eventDispatch(conversation.eventAction);
    }
  }, [conversation?.eventAction, eventDispatch]);

  useEffect(() => {
    if (newMessage?.eventAction != null) {
      eventDispatch(newMessage.eventAction);
    }
  }, [newMessage?.eventAction, eventDispatch]);

  useEffect(() => {
    const toBlock = Object.entries(events.Message)
      .filter(contact => contact[1].blocked)
      .map(contact => contact[0] as CONTACT_NAMES);
    const prevBlocked = conversations.filter(c => c.blocked).map(c => c.name);
    const needToBlock = toBlock.filter(b => !prevBlocked.includes(b));
    if (needToBlock.length > 0) {
      const update = produce(conversations, draft => {
        needToBlock.forEach(name => {
          const index = draft.findIndex(c => c.name === name);
          draft[index].blocked = true;
        });
        return draft;
      });
      setConversations(update);
    }
  }, [conversations, events]);

  useEffect(() => {
    const blocked = conversations.filter(c => c.blocked).map(c => c.name);
    if (conversation && blocked.includes(conversation.name)) {
      dispatchConversation({type: CONVERSATION_REDUCER_ACTIONS.RESET});
    }

    if (newMessage && blocked.includes(newMessage.name)) {
      dispatchNewMessage({type: CONVERSATION_REDUCER_ACTIONS.RESET});
    }
  }, [conversation, conversations, newMessage]);

  useEffect(() => {
    dispatchConversation({
      type: CONVERSATION_REDUCER_ACTIONS.REFRESH_AVAILABLE_ROUTE,
      payload: events,
    });

    dispatchNewMessage({
      type: CONVERSATION_REDUCER_ACTIONS.REFRESH_AVAILABLE_ROUTE,
      payload: events,
    });
  }, [events]);

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
    const freezeUnfinished = (
      _conversations: ConversationType[],
      prev: ConversationType[],
      _events: EventOrchestraObjectType,
      conversationBeingViewed?: CONTACT_NAMES,
    ) => {
      for (const c of _conversations) {
        if (
          conversationBeingViewed === c.name ||
          getUnfinishedRouteID(c.name, _events, c.routes)
        ) {
          const prevConversation = prev.find(p => p.name === c.name);
          c.availableEventRoutes = prevConversation?.availableEventRoutes || [];
        }
      }
    };

    if (prevConversations && prevConversations !== viewable) {
      freezeUnfinished(viewable, prevConversations, events, conversation?.name);
      const preAvailableNames = prevConversations.map(c => c.name);

      const newConversations = viewable.filter(
        v =>
          !preAvailableNames.includes(v.name) ||
          filterDispatchedEventRoutes(v, prevConversations),
      );
      newConversations.forEach(c => {
        if (c.name !== newMessage?.name && c.name !== conversation?.name) {
          sendNotification(c, events, eventDispatch, setSendNotifications);
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
    digestConvo,
  ]);

  useEffect(() => {
    NotificationEmitter.on(EMITTER_EVENTS.NOTIFICATION, name => {
      const _conversation = conversations.filter(c => c.name === name)[0];
      digestConvo(_conversation);
    });
    return () => {
      NotificationEmitter.off(EMITTER_EVENTS.NOTIFICATION, () => {});
    };
  }, [conversations, digestConvo]);

  // useEffect(() => {
  //   if (!beganSpamAttack.current) {
  //     const index = conversations.findIndex(
  //       c => c.name === CONTACT_NAMES.SPAM3,
  //     );
  //     const spam = conversations[index];
  //     if (spam.blocked) {
  //       const update = produce(conversations, draft => {
  //         draft.push(createSpam());
  //       });
  //       setConversations(update);
  //       beganSpamAttack.current = true;
  //     }
  //   }
  // }, [conversations]);

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
          digest: digestNewMessage,
          dispatch: newMessageResolver,
        },
        conversation: {
          state: conversation,
          digest: digestConvo,
          dispatch: reducerResolver,
        },
        listCovered: {state: listCovered, set: setListCovered},
      }}>
      {props.children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
export const MessagesContextConsumer = MessagesContext.Consumer;
