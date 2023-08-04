import {Image, ImageSourcePropType, Platform} from 'react-native';
import {BubblePath, flipPath} from './BubblePath';

import {
  DigestConfigurationType,
  DigestedConversationEmojiItemType,
  DigestedConversationGlyphItemType,
  DigestedConversationImageItemType,
  DigestedConversationNumberItemType,
  DigestedConversationSnapShotItemType,
  DigestedConversationStringItemType,
  DigestedConversationVCardItemType,
  MESSAGE_TYPE,
} from './types';
import {SkFont, Vector} from '@shopify/react-native-skia';
import {
  ConversationType,
  MessageWithMetaType,
} from 'components/apps/Messages/context/types';
import {
  CONTACT_NAMES,
  getColorFromContacts,
  getAvatarFromContacts,
} from 'components/apps/Messages/context/usersMapping';
import {BUBBLE_PADDING} from '.';
import {
  GetDimensionsAndSkiaNodes,
  calculatedItemWidth,
} from './skiaCalculations';

type CalculationsType = {
  height: number;
  width: number;
  content:
    | string
    | Element[]
    | {filename: string; backup: string}
    | ConversationType;
  cursorVector: Vector;
};

type ItemType =
  | DigestedConversationEmojiItemType
  | DigestedConversationImageItemType
  | DigestedConversationGlyphItemType
  | DigestedConversationNumberItemType
  | DigestedConversationStringItemType
  | DigestedConversationSnapShotItemType
  | DigestedConversationVCardItemType;

export const SkMessageItem = (
  itemConfiguration: DigestConfigurationType,
  message: MessageWithMetaType,
  name: CONTACT_NAMES,
  hasTail: boolean,
) => {
  const DEFAULT_BOTTOM_PADDING = 4;
  const BOTTOM_PADDING_FOR_LAST_IN_BLOCK = 8;
  const ADDED_HEIGHT_FOR_VISIBLE_NAME = 20;
  const {group, width, positionAcc, font} = itemConfiguration;
  const leftSide = name !== 'Self';

  const calculations = calculateWidthHeightAndContent(
    message,
    width,
    leftSide,
    font,
  );

  const skItem: ItemType = {
    alignItems: leftSide ? 'flex-start' : 'flex-end',
    content: calculations.content,
    height:
      group && hasTail && name !== CONTACT_NAMES.SELF
        ? calculations.height + ADDED_HEIGHT_FOR_VISIBLE_NAME
        : calculations.height,
    width: calculations.width,
    paddingBottom: hasTail
      ? BOTTOM_PADDING_FOR_LAST_IN_BLOCK
      : DEFAULT_BOTTOM_PADDING,
    name: name,
    offset: positionAcc,
    clip: [MESSAGE_TYPE.EMOJI].includes(message.type)
      ? undefined
      : createPath(calculations, hasTail, leftSide),
    colors: getColorFromContacts(name),
    cursorVector: calculations.cursorVector,
    avatar: hasTail ? getAvatarFromContacts(name) : undefined,
    leftSide: leftSide,
    type: message.type,
    reaction: message.reaction,
    messageDelay: message.messageDelay,
    typingDelay: message.typingDelay,
    effect: message.effect,
  };

  return skItem;
};

const createPath = (
  calculations: CalculationsType,
  tail: boolean,
  flip: boolean,
) => {
  const clip = BubblePath(calculations.width, calculations.height, 16, tail);
  if (flip) {
    flipPath(clip, calculations.width);
  }
  return clip;
};

const calculateWidthHeightAndContent = (
  message: MessageWithMetaType,
  width: number,
  leftSide: boolean,
  font: SkFont,
): CalculationsType => {
  const itemWidth = leftSide ? width * 0.7 - 30 : width * 0.7;
  switch (message.type) {
    case MESSAGE_TYPE.EMOJI:
      return {
        width: itemWidth,
        height: 60,
        content: message.message,
        cursorVector: {x: itemWidth + 2, y: 0},
      };
    case MESSAGE_TYPE.SNAPSHOT:
      return {
        width: itemWidth,
        height: 0,
        content: message.message,
        cursorVector: {x: itemWidth + 2, y: 0},
      };
    case MESSAGE_TYPE.IMAGE:
      const imageDimensions = Image.resolveAssetSource(
        message.message as ImageSourcePropType,
      );
      const aspectRation = imageDimensions.height / imageDimensions.width;
      const imageHeight = itemWidth * aspectRation;
      return {
        width: itemWidth,
        height: imageHeight,
        content: message.message,
        cursorVector: {x: itemWidth + 2, y: 0},
      };
    case MESSAGE_TYPE.NUMBER:
      return {
        width: calculatedItemWidth(font, message.message.name, itemWidth),
        height: 30,
        content: message.message,
        cursorVector: {x: itemWidth + 2, y: 0},
      };
    case MESSAGE_TYPE.STRING:
      const [boxHeight, boxWidth, textNodes, cursorVector] =
        GetDimensionsAndSkiaNodes(font, font, message.message, width, leftSide);
      return {
        width: boxWidth,
        height: boxHeight + BUBBLE_PADDING,
        content: textNodes,
        cursorVector: cursorVector,
      };

    case MESSAGE_TYPE.GLYPH:
      const [glyphHeight, glyphWidth, glyphNodes] = GetDimensionsAndSkiaNodes(
        font,
        font,
        message.message,
        width,
        leftSide,
      );
      return {
        width: glyphWidth,
        height: glyphHeight,
        content: glyphNodes,
        cursorVector: {x: 1, y: 1},
      };
    case MESSAGE_TYPE.VCARD:
      return {
        width: 180,
        height: 60,
        content: message.message,
        cursorVector: {x: 180 + 2, y: 0},
      };
    default:
      return {
        width: itemWidth,
        height: 60,
        content: '',
        cursorVector: {x: itemWidth + 2, y: 0},
      };
  }
};
