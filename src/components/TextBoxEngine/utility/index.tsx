import {Glyph, SkFont, vec} from '@shopify/react-native-skia';
import {GlyphContent} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import theme from 'themes';

export const generateFrameDimensions = (
  font: SkFont,
  width: number,
  height: number,
  bottomMargin?: number,
  radius?: number,
) => {
  font.setSize(24);
  const textBoxHeight = 200;
  const textBoxWidth = width - theme.spacing.p2;
  const textBoxX = width - theme.spacing.p1 - textBoxWidth;
  const textBoxY =
    height - textBoxHeight - (bottomMargin || 0) - theme.spacing.p1;
  return {
    x: textBoxX,
    y: textBoxY,
    width: textBoxWidth,
    height: textBoxHeight,
    radius: radius || 15,
  };
};

type LineQueueType = SectionType[][];

type SectionType = {
  type: 'text';
  starts: number;
  content: string;
};

export const generateLineQueue = (
  font: SkFont,
  sentence: string,
  width: number,
) => {
  const lineQueue: LineQueueType = [];
  let lineWidth = 0;
  let content = '';

  const appendContent = (textString: string) => {
    lineQueue.push([
      {
        type: 'text',
        starts: 0,
        content: textString,
      },
    ]);
  };

  const calculateFontElement = (word: string) => {
    const wordWidth = font.getTextWidth(word);
    if (lineWidth + wordWidth > width) {
      appendContent(content);
      content = word + ' ';
      lineWidth = wordWidth + font.getTextWidth(' ');
    } else {
      content += word + ' ';
      lineWidth += wordWidth + font.getTextWidth(' ');
    }
  };

  sentence.split(' ').forEach(word => {
    calculateFontElement(word);
  });

  if (content) {
    appendContent(content);
  }
  return lineQueue;
};

const generateGlyphs = (lineQueue: LineQueueType, font: SkFont) => {
  const lineCount = lineQueue.length;
  let returnItem: Glyph[] = [];

  lineQueue.forEach((line, index) =>
    line.forEach(
      (section, sIdx) =>
        (returnItem = returnItem.concat(
          getGlyphIdsAndWidths(section, font, index),
        )),
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

export const getDimensionsAndSkiaGlyphs = (
  font: SkFont,
  sentence: string,
  width: number,
  fontSize: number,
) => {
  font.setSize(fontSize);
  const lineQueue = generateLineQueue(font, sentence, width);
  const [lineCount, glyphs] = generateGlyphs(lineQueue, font);

  return glyphs;
};
