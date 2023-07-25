import {DigestedConversationListItem} from './digestion/types';
import {
  ConversationType,
  DigestedConversationType,
  ExchangeBlockType,
  MessageType,
} from '../../context/types';
import {SkFont} from '@shopify/react-native-skia';
import {EventOrchestraObjectType} from 'components/EventOrchestra/context/types';
import {CONTACT_NAMES} from '../../context/usersMapping';

export enum CONVERSATION_REDUCER_ACTIONS {
  ADD_CONVERSATION,
  ADD_MESSAGE,
  ADD_MESSAGE_FROM_BLOCK,
  CONTINUE_ROUTE,
  DIGEST_CONVERSATION,
  START_ROUTE,
  UPDATE_MESSAGE,
  RESET,
}

export type DigestedMessageProps = {
  [index in keyof DigestedConversationListItem]?: DigestedConversationListItem[index];
};

export type AddMessagePayloadType = {
  messageContent: MessageType;
  name: CONTACT_NAMES;
  tail: boolean;
};

type AddConversationActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.ADD_CONVERSATION;
  payload: DigestedConversationType;
};

type AddMessageFromBlockActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.ADD_MESSAGE;
  payload: AddMessagePayloadType;
};

type AddMessageActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.ADD_MESSAGE_FROM_BLOCK;
  payload: {block: ExchangeBlockType; index: number};
};

type ContinueRouteActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.CONTINUE_ROUTE;
};

type DigestConversationActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.DIGEST_CONVERSATION;
  payload: ConversationType;
};

type ResetConversationActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.RESET;
};

type StartRouteActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.START_ROUTE;
  payload: {
    id: number;
    chosenOption: string;
  };
};

type UpdateMessageActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.UPDATE_MESSAGE;
  payload: {
    props: DigestedMessageProps;
    index: number;
  };
};

export type ConversationReducerConfigurationType = {
  font: SkFont;
  emojiFont: SkFont;
  width: number;
  events: EventOrchestraObjectType;
};

export type DigestConfigurationType = {
  font: SkFont;
  emojiFont: SkFont;
  width: number;
};
export type ConversationReducerActionsType =
  | AddMessageActionType
  | AddMessageFromBlockActionType
  | AddConversationActionType
  | ContinueRouteActionType
  | DigestConversationActionType
  | ResetConversationActionType
  | StartRouteActionType
  | UpdateMessageActionType;
