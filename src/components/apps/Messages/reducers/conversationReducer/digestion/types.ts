import {FlexAlignType, ImageSourcePropType} from 'react-native';
import {
  ConversationType,
  ReactionType,
  RouteConditionsType,
} from '../../../context/types';
import {
  Glyph,
  SkFont,
  SkImage,
  SkPath,
  Vector,
} from '@shopify/react-native-skia';
import {CONTACT_NAMES} from '../../../context/usersMapping';

export enum MESSAGE_TYPE {
  EMOJI = 'emoji',
  TIME = 'time',
  IMAGE = 'image',
  GLYPH = 'glyph',
  NUMBER = 'number',
  SNAPSHOT = 'snapshot',
  STRING = 'string',
  VCARD = 'vcard',
}
export enum EFFECT_TYPE {
  FULL_REPLACEMENT,
  GLITCH,
  LOGLINE_REPLACEMENT,
}

export type MessageEffectType = {
  type: EFFECT_TYPE;
  data: any;
  conditions?: RouteConditionsType;
};

export type GlyphContent = {
  font: SkFont;
  glyphs: Glyph[];
};

export type GlyphItemContentType = {
  text: GlyphContent;
  emoji: GlyphContent;
};

export type DigestConfigurationType = {
  font: SkFont;
  emojiFont: SkFont;
  width: number;
  positionAcc: number;
  group?: boolean;
};

export interface AbstractDigestedConversationItemType {
  height: number;
  width: number;
  offset: number;
  paddingBottom: number;
  messageDelay?: number;
  typingDelay?: number;
  lastMessageSent?: boolean;
  deliveredOnly?: boolean;
  readTimeStamp?: Date;
}

export interface DigestedConversationTimeType
  extends AbstractDigestedConversationItemType {
  content: string;
  alignItems: undefined;
  type: MESSAGE_TYPE.TIME;
  cursorVectors: Vector;
}

export interface AbstractMetaDigestedConversationItemType
  extends AbstractDigestedConversationItemType {
  alignItems: FlexAlignType;
  avatar?: ImageSourcePropType;
  colors: string[];
  name: CONTACT_NAMES;
  leftSide: boolean;
  reaction?: ReactionType;
  effect?: MessageEffectType;
}

export interface DigestedConversationStringItemType
  extends AbstractMetaDigestedConversationItemType {
  clip: SkPath;
  content: React.JSX.Element[];
  type: MESSAGE_TYPE.STRING;
}

export interface DigestedConversationGlyphItemType
  extends AbstractMetaDigestedConversationItemType {
  clip: SkPath;
  content: React.JSX.Element[];
  type: MESSAGE_TYPE.GLYPH;
}

export interface DigestedConversationImageItemType
  extends AbstractMetaDigestedConversationItemType {
  clip: SkPath;
  content: string;
  type: MESSAGE_TYPE.IMAGE;
}

export interface DigestedConversationEmojiItemType
  extends AbstractMetaDigestedConversationItemType {
  content: string;
  type: MESSAGE_TYPE.EMOJI;
}

export interface DigestedConversationNumberItemType
  extends AbstractMetaDigestedConversationItemType {
  content: ConversationType;
  clip: SkPath;
  type: MESSAGE_TYPE.NUMBER;
}

export interface DigestedConversationSnapShotItemType
  extends AbstractMetaDigestedConversationItemType {
  content: {image?: SkImage; backup: string; filename: string};
  type: MESSAGE_TYPE.SNAPSHOT;
}

export interface DigestedConversationVCardItemType
  extends AbstractMetaDigestedConversationItemType {
  content: ConversationType;
  clip: SkPath;
  type: MESSAGE_TYPE.VCARD;
}

export type DigestedConversationListItem =
  | DigestedConversationEmojiItemType
  | DigestedConversationImageItemType
  | DigestedConversationGlyphItemType
  | DigestedConversationNumberItemType
  | DigestedConversationTimeType
  | DigestedConversationSnapShotItemType
  | DigestedConversationStringItemType
  | DigestedConversationVCardItemType;

export type BubbleItemType = Exclude<
  DigestedConversationListItem,
  DigestedConversationTimeType
>;
