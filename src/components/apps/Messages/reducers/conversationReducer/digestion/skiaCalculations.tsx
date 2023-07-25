import React from 'react';
import {Glyph, SkFont, Text, vec} from '@shopify/react-native-skia';
import {GlyphContent} from './types';

type LineQueueType = SectionType[][];

type SectionType = {
  type: 'emoji' | 'text';
  starts: number;
  content: string;
};
export const generateLineQueue = (
  font: SkFont,
  emojiFont: SkFont,
  sentence: string,
  width: number,
  leftSide: boolean,
) => {
  const LEFT_PADDING = leftSide ? 24 : 8;
  const lineQueue: LineQueueType = [];
  let lineWidth = 0;
  let widthSinceEmoji = 0;
  let content = '';

  const appendContent = (textString: string) => {
    if (widthSinceEmoji === 0) {
      lineQueue.push([
        {
          type: 'text',
          starts: LEFT_PADDING + widthSinceEmoji,
          content: textString,
        },
      ]);
    } else {
      lineQueue[lineQueue.length - 1].push({
        type: 'text',
        content: textString,
        starts: LEFT_PADDING + widthSinceEmoji,
      });
    }
  };
  const calculateFontElement = (word: string) => {
    const wordWidth = font.getTextWidth(word);
    if (lineWidth + wordWidth > width) {
      appendContent(content);
      widthSinceEmoji = 0;
      content = word + ' ';
      lineWidth = wordWidth + font.getTextWidth(' ');
    } else {
      content += word + ' ';
      lineWidth += wordWidth + font.getTextWidth(' ');
    }
  };

  const calculateEmojiElement = (word: string) => {
    const wordWidth = emojiFont.getTextWidth(word);
    if (lineWidth + wordWidth > width) {
      lineQueue[lineQueue.length - 1].push({
        type: 'text',
        starts: LEFT_PADDING + widthSinceEmoji,
        content: content,
      });

      lineWidth = wordWidth + font.getTextWidth(' ');
      widthSinceEmoji = lineWidth;

      lineQueue.push([{type: 'emoji', starts: LEFT_PADDING, content: word}]);
    } else {
      if (lineQueue.length === 0) {
        lineQueue.push([]);
      }
      lineQueue[lineQueue.length - 1].push({
        type: 'emoji',
        content: word,
        starts: lineWidth + LEFT_PADDING,
      });
      lineWidth += wordWidth + font.getTextWidth(' ');
      widthSinceEmoji = lineWidth;
    }
    content = '';
  };

  sentence.split(' ').forEach(word => {
    const isEmoji = /\p{Extended_Pictographic}/u.test(word);
    if (isEmoji) {
      if (content !== ' ') {
        content += ' ';
        lineWidth += font.getTextWidth(' ');
        appendContent(content);
      }
      calculateEmojiElement(word);
    } else {
      calculateFontElement(word);
    }
  });

  if (content) {
    appendContent(content);
  }
  return lineQueue;
};

const generateTextNodes = (
  lineQueue: LineQueueType,
  font: SkFont,
  emojiFont: SkFont,
) => {
  const lineCount = lineQueue.length;
  const textElements = lineQueue
    .map((line, index) =>
      line.map((section, sIdx) => (
        <Text
          x={section.starts}
          y={19 * (index + 1) + 4}
          text={section.content}
          font={section.type === 'text' ? font : emojiFont}
          color={'white'}
          key={`Text-${section.content}-${sIdx}`}
        />
      )),
    )
    .flat();
  return [lineCount, textElements] as const;
};

const generateGlyphs = (
  lineQueue: LineQueueType,
  font: SkFont,
  emojiFont: SkFont,
) => {
  const lineCount = lineQueue.length;
  const returnItem: {text: GlyphContent; emoji: GlyphContent} = {
    text: {font: font, glyphs: []},
    emoji: {font: emojiFont, glyphs: []},
  };

  lineQueue.forEach((line, index) =>
    line.forEach(
      (section, sIdx) =>
        (returnItem[section.type].glyphs = returnItem[
          section.type
        ].glyphs.concat(getGlyphIdsAndWidths(section, font, index))),
    ),
  );

  return [lineCount, returnItem] as const;
};

const getGlyphIdsAndWidths = (
  section: SectionType,
  font: SkFont,
  lineNumber: number,
): Glyph[] => {
  const glyphIds = font.getGlyphIDs(section.content);
  const widths = font.getGlyphWidths(glyphIds);
  let startsAt = section.starts;
  return glyphIds.map((glyph, idx) => {
    const glyphInfo = {
      id: glyph,
      pos: vec(startsAt, 19 * (lineNumber + 1) + 4),
    };
    startsAt += widths[idx];
    return glyphInfo;
  });
};

export const calculatedItemWidth = (
  font: SkFont,
  sentence: string,
  maxWidth: number,
) => {
  const LINE_PADDING = 40;
  const RIGHT_SIDE_PADDING = 8;
  let calculatedWidth = font.getTextWidth(sentence) + LINE_PADDING;
  return Math.min(calculatedWidth, maxWidth) + RIGHT_SIDE_PADDING;
};

export const GetDimensionsAndSkiaNodes = (
  font: SkFont,
  emojiFont: SkFont,
  sentence: string,
  width: number,
  leftSide: boolean,
) => {
  const LINE_HEIGHT = 19;
  const LINE_PADDING = 40;
  const MAX_WIDTH = leftSide ? width * 0.65 - 30 : width * 0.7;
  const lineQueue = generateLineQueue(
    font,
    emojiFont,
    sentence,
    MAX_WIDTH - LINE_PADDING,
    leftSide,
  );
  const calculatedWidth = lineQueue.reduce((acc, line) => {
    return Math.max(
      acc,
      calculatedItemWidth(font, line.map(p => p.content).join(''), MAX_WIDTH),
    );
  }, 0);
  const [lineCount, textNodes] = generateTextNodes(lineQueue, font, emojiFont);

  return [lineCount * LINE_HEIGHT, calculatedWidth, textNodes] as const;
};

export const GetDimensionsAndSkiaGlyphs = (
  font: SkFont,
  sentence: string,
  width: number,
  leftSide: boolean,
) => {
  const LINE_HEIGHT = 19;
  const LINE_PADDING = 40;
  const RIGHT_SIDE_PADDING = 8;
  const MAX_WIDTH = leftSide ? width * 0.65 - 30 : width * 0.65;
  let calculatedWidth = font.getTextWidth(sentence) + LINE_PADDING;
  calculatedWidth = Math.min(
    calculatedWidth + RIGHT_SIDE_PADDING,
    MAX_WIDTH + 8,
  );
  const lineQueue = generateLineQueue(
    font,
    font,
    sentence,
    MAX_WIDTH - LINE_PADDING,
    leftSide,
  );
  const [lineCount, glyphs] = generateGlyphs(lineQueue, font, font);

  return [lineCount * LINE_HEIGHT, calculatedWidth, glyphs] as const;
};
