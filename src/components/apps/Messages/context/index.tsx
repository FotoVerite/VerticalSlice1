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
  convertMessageToString,
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
import {greg} from '../assets/messages/greg';
import {NOTIFICATIONS_REDUCER_ACTIONS} from 'components/Notifications/reducers/notificationsReducer/types';
import {leo} from '../assets/messages/leo';
import {lenny} from '../assets/messages/lenny';

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

  const [media, setMedia] = useState<ReactElement>();
  const [listCovered, setListCovered] = useState<boolean>(false);
  const [sendNotifications, setSendNotifications] = useState<
    SendNotificationType[]
  >([]);

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
  }, [events]);

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
  }, [events]);

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
    const unsentNotifications = [] as SendNotificationType[];
    sendNotifications.forEach(notification => {
      const {routeID, message} = notification;
      const foundEvent = Object.keys(
        events.Message[notification.conversation.name].routes,
      ).find(id => id === routeID.toString());
      if (foundEvent) {
        notificationContext.notifications.dispatch({
          type: NOTIFICATIONS_REDUCER_ACTIONS.ADD,
          payload: {
            data: {
              active: true,
              title: `Message From ${notification.conversation.name}`,
              content: convertMessageToString(message),
              timestamp: new Date(),
              image: notification.conversation.heroImage,
              onPress: () => digestConvo(notification.conversation),
            },
          },
        });
      } else {
        unsentNotifications.push(notification);
      }
    });
    if (unsentNotifications.length !== sendNotifications.length) {
      setSendNotifications(unsentNotifications);
    }
  }, [
    sendNotifications,
    events.Message,
    notificationContext.notifications,
    digestConvo,
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
