import {FlexAlignType, ImageSourcePropType} from 'react-native';
import {ConversationType, ReactionType} from '../../../context/types';
import {Glyph, SkFont, SkImage, SkPath} from '@shopify/react-native-skia';
import {CONTACT_NAMES} from '../../../context/usersMapping';

export enum DigestedItemTypes {
  EMOJI = 'emoji',
  TIME = 'time',
  IMAGE = 'image',
  GLYPH = 'glyph',
  NUMBER = 'number',
  SNAPSHOT = 'snapshot',
  STRING = 'string',
  VCARD = 'vcard',
}

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
}

export interface DigestedConversationTimeType
  extends AbstractDigestedConversationItemType {
  content: string;
  alignItems: undefined;
  type: DigestedItemTypes.TIME;
}

export interface AbstractMetaDigestedConversationItemType
  extends AbstractDigestedConversationItemType {
  alignItems: FlexAlignType;
  avatar?: ImageSourcePropType;
  colors: string[];
  name: CONTACT_NAMES;
  leftSide: boolean;
  reaction?: ReactionType;
}

export interface DigestedConversationStringItemType
  extends AbstractMetaDigestedConversationItemType {
  clip: SkPath;
  content: React.JSX.Element[];
  type: DigestedItemTypes.STRING;
}

export interface DigestedConversationGlyphItemType
  extends AbstractMetaDigestedConversationItemType {
  clip: SkPath;
  content: React.JSX.Element[];
  type: DigestedItemTypes.GLYPH;
}

export interface DigestedConversationImageItemType
  extends AbstractMetaDigestedConversationItemType {
  clip: SkPath;
  content: string;
  type: DigestedItemTypes.IMAGE;
}

export interface DigestedConversationEmojiItemType
  extends AbstractMetaDigestedConversationItemType {
  content: string;
  type: DigestedItemTypes.EMOJI;
}

export interface DigestedConversationNumberItemType
  extends AbstractMetaDigestedConversationItemType {
  content: ConversationType;
  clip: SkPath;
  type: DigestedItemTypes.NUMBER;
}

export interface DigestedConversationSnapShotItemType
  extends AbstractMetaDigestedConversationItemType {
  content: {image?: SkImage; backup: string; filename: string};
  type: DigestedItemTypes.SNAPSHOT;
}

export interface DigestedConversationVCardItemType
  extends AbstractMetaDigestedConversationItemType {
  content: ConversationType;
  clip: SkPath;
  type: DigestedItemTypes.VCARD;
}

export type BubbleItemType =
  | DigestedConversationEmojiItemType
  | DigestedConversationImageItemType
  | DigestedConversationGlyphItemType
  | DigestedConversationNumberItemType
  | DigestedConversationSnapShotItemType
  | DigestedConversationStringItemType
  | DigestedConversationVCardItemType;

export type DigestedConversationListItem =
  | BubbleItemType
  | DigestedConversationTimeType;
