import {PropsWithChildren, ReactElement, ReactNode} from 'react';
import {SharedValue} from 'react-native-reanimated';

import {
  GenericOrUndefinedStateType,
  GenericStateType,
} from 'types/genericContextTypes';
import {CONTACT_NAMES} from './usersMapping';

import {
  DigestedConversationListItem,
  MESSAGE_TYPE,
  MessageEffectType,
} from '../reducers/conversationReducer/digestion/types';
import {
  AddMessagePayloadType,
  ConversationReducerActionsType,
} from '../reducers/conversationReducer/types';
import {ImageSourcePropType} from 'react-native';
import {EventsReducerActionsType} from 'components/EventOrchestra/reducers/types';
export type MessagesSharedValuesType = {
  wordInputShake: SharedValue<number>;
  infoOpened: SharedValue<number>;
};

export type MessagesContextTypeDigest = {
  children: ReactNode;
};

export type MessagesContextTypeDigested = PropsWithChildren<{
  conversations: ConversationType[];
  conversation: {
    state: DigestedConversationType | undefined | null;
    dispatch: (action: ConversationReducerActionsType) => void;
    digest: (
      _conversation: ConversationType,
      newMessage?: boolean,
    ) => Promise<void>;
  };
  listCovered: GenericStateType<boolean>;
  newMessage: {
    state: DigestedConversationType | undefined | null;
    dispatch: (action: ConversationReducerActionsType) => void;
    digest: (
      _conversation: ConversationType,
      newMessage?: boolean,
    ) => Promise<void>;
  };
  media: GenericOrUndefinedStateType<ReactElement>;
}>;

export type RouteChosenConditionType = {
  [key: string]: {chosen?: string[]; not_chosen?: string[]; finished?: boolean};
};

export type RouteViewedConditionType = {
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
};

export type RouteConditionsType = {
  [key in CONTACT_NAMES]?: {
    views?: RouteViewedConditionType;
    routes?: RouteChosenConditionType;
  };
};

export type MessageRouteType = {
  id: number;
  conditions?: RouteConditionsType;
  effects?: MessageEffectType[];
  options: string[];
  routes: {[key: string]: ExchangeBlockType[]};
};

export type EventBasedRouteType = {
  id: number;
  delay?: number;
  conditions?: RouteConditionsType;
  exchanges: ExchangeBlockType[];
};

export type ConversationType = {
  availableEventRoutes?: number[];
  conditions?: RouteConditionsType;
  effects?: MessageEffectType[];
  eventBasedRoutes?: EventBasedRouteType[];
  exchanges: ConversationExchangeType[];
  group?: boolean;
  hasAvailableRoute?: boolean;
  heroImage: ImageSourcePropType;
  interfaceColor: string;
  logline?: {content: string; time: string};
  name: CONTACT_NAMES;
  routes?: MessageRouteType[];

  tags: string[];
};

export type DigestedConversationType = {
  activePath: AddMessagePayloadType[];
  availableRoute?: MessageRouteType;
  chosenRoute?: string;
  eventAction?: EventsReducerActionsType;
  pendingMessages: AddMessagePayloadType[];
  nextMessageInQueue?: MessageType;
  tags: string[];
  name: CONTACT_NAMES;
  heroImage: ImageSourcePropType;
  exchanges: DigestedConversationListItem[];
  group?: boolean;
  routes: MessageRouteType[];
  routeAtIndex?: number;
  eventBasedRoutes?: EventBasedRouteType[];
  interfaceColor: string;
};

export type ConversationExchangeType = {
  time: string;
  exchanges: ExchangeBlockType[];
};

export type ExchangeBlockType = {
  name: CONTACT_NAMES;
  messages: MessageType[];
};

export type MessageType = string | MessageWithMetaType;

export type MessageWithMetaType =
  | EmojiMessageWithMeta
  | GlyphMessageWithMeta
  | ImageMessageWithMeta
  | NumberMessageWithMeta
  | StringMessageWithMeta
  | SnapshotMessageWithMeta
  | VCardMessageWithMeta;

interface AbstractMessageWithMetaType {
  messageDelay?: number;
  typingDelay?: number;
  reaction?: ReactionType;
  effect?: MessageEffectType;
}

export interface StringMessageWithMeta extends AbstractMessageWithMetaType {
  message: string;
  type: MESSAGE_TYPE.STRING;
}

export interface ImageMessageWithMeta extends AbstractMessageWithMetaType {
  message: string;
  type: MESSAGE_TYPE.IMAGE;
}

export interface EmojiMessageWithMeta extends AbstractMessageWithMetaType {
  message: string;
  type: MESSAGE_TYPE.EMOJI;
}
export interface GlyphMessageWithMeta extends AbstractMessageWithMetaType {
  message: string;
  type: MESSAGE_TYPE.GLYPH;
}

export interface NumberMessageWithMeta extends AbstractMessageWithMetaType {
  message: ConversationType;
  type: MESSAGE_TYPE.NUMBER;
}

export interface SnapshotMessageWithMeta extends AbstractMessageWithMetaType {
  type: MESSAGE_TYPE.SNAPSHOT;
  message: {backup: string; filename: string};
}

export interface VCardMessageWithMeta extends AbstractMessageWithMetaType {
  message: ConversationType;
  type: MESSAGE_TYPE.VCARD;
}

export type ReactionType = {name: string; color: string; delay?: number};
