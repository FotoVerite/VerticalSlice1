import {PropsWithChildren, ReactElement, ReactNode} from 'react';
import {SharedValue} from 'react-native-reanimated';

import {GenericOrUndefinedStateType} from 'types/genericContextTypes';
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
    state: DigestedConversationType | undefined;
    dispatch: (action: ConversationReducerActionsType) => Promise<void>;
  };
  newMessage: {
    state: DigestedConversationType | undefined;
    dispatch: (action: ConversationReducerActionsType) => Promise<void>;
  };
  media: GenericOrUndefinedStateType<ReactElement>;
}>;

export type RouteChosenConditionType = {
  [key: string]: {chosen?: string[]; not_chosen?: string[]};
};

export type RouteConditionsType = {
  [key in CONTACT_NAMES]?: {views?: number; routes?: RouteChosenConditionType};
};

export type MessageRouteType = {
  id: number;
  conditions?: RouteConditionsType;
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
  tags: string[];
  conditions?: RouteConditionsType;
  name: CONTACT_NAMES;
  heroImage: ImageSourcePropType;
  exchanges: ConversationExchangeType[];
  group?: boolean;
  routes?: MessageRouteType[];
  eventBasedRoutes?: EventBasedRouteType[];
  hasAvailableRoute?: boolean;
  interfaceColor: string;
};

export type DigestedConversationType = {
  activePath: AddMessagePayloadType[];
  availableRoute?: MessageRouteType;
  tags: string[];
  name: CONTACT_NAMES;
  heroImage: ImageSourcePropType;
  exchanges: DigestedConversationListItem[];
  group?: boolean;
  routes: MessageRouteType[];
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
