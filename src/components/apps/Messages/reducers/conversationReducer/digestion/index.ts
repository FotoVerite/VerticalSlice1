import {SkFont, Skia} from '@shopify/react-native-skia';
import {getSnapshotPath} from 'components/Snapshot/context';
import {createTimeItem} from 'components/apps/Messages/reducers/conversationReducer/digestion/TimeItem';
import {
  DigestedConversationListItem,
  DigestedItemTypes,
} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {
  ConversationExchangeType,
  ConversationType,
  DigestedConversationType,
  ExchangeBlockType,
  MessageType,
} from 'components/apps/Messages/context/types';

import ReactNativeBlobUtil from 'react-native-blob-util';
import {
  AddMessagePayloadType,
  ConversationReducerConfigurationType,
  DigestConfigurationType,
} from '../types';
import {EventOrchestraObjectType} from 'components/EventOrchestra/context/types';
import {SkMessageItem} from './SkMessageItem';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {
  getSeenRoutes,
  RouteObjectType,
  isMessageWithMeta,
} from '../routing/seen';
import {findAvailableRoutes} from '../routing/available';

type BaseConfigType = {
  font: SkFont;
  emojiFont: SkFont;
  width: number;
};
type ItemConfigurationType = BaseConfigType & {
  group: boolean;
  positionAcc: number;
};

export const BUBBLE_PADDING = 18;

export const getListHeight = (exchanges: DigestedConversationListItem[]) => {
  const lastNode = exchanges.slice(-1)[0];
  if (lastNode == null) {
    return 50;
  }
  return lastNode.offset + lastNode.height + lastNode.paddingBottom;
};

export const digestConversation = async (
  config: ConversationReducerConfigurationType,
  conversation: ConversationType,
) => {
  const {exchanges, ...conversationProps} = conversation;
  const {events, ...configProps} = config;

  const digestedExchanges = digestExchanges(
    configProps,
    exchanges,
    conversationProps.group,
  );
  const digested = Object.assign(conversationProps, {
    exchanges: digestedExchanges,
    routes: conversationProps.routes || [],
    activePath: [],
    availableRoute: findAvailableRoutes(
      conversationProps.name,
      conversationProps.routes || [],
      events,
    )[0],
  });
  digested.exchanges = appendSeenRoutes(digested, events, configProps);
  digested.exchanges = await resolveSnapshots(digested.exchanges);
  return digested;
};

const appendSeenRoutes = (
  digested: DigestedConversationType,
  event: EventOrchestraObjectType,
  config: BaseConfigType,
) => {
  if (digested.routes == null) {
    digested.exchanges;
  }
  const seenRoutes = getSeenRoutes(
    digested.name,
    event,
    digested.routes,
    digested.eventBasedRoutes,
  );

  return seenRoutes.reduce((digestedExchanges, routes) => {
    return appendRoute(digestedExchanges, routes, digested.group, config);
  }, digested.exchanges);
};

const appendRoute = (
  exchanges: DigestedConversationListItem[],
  route: RouteObjectType,
  group: boolean = false,
  config: BaseConfigType,
) => {
  const offset = getListHeight(exchanges);
  const conversationBlock: ConversationExchangeType = {
    time: route.date.toISOString(),
    exchanges: route.exchanges,
  };
  return exchanges.concat(
    digestExchanges(config, [conversationBlock], group, offset),
  );
};

export const digestExchanges = (
  configuration: DigestConfigurationType,
  conversationExchanges: ConversationExchangeType[],
  group: boolean = false,
  offset: number = 50,
) => {
  const ret: DigestedConversationListItem[] = [];
  const itemConfiguration: ItemConfigurationType = {
    font: configuration.font,
    emojiFont: configuration.emojiFont,
    width: configuration.width,
    positionAcc: offset,
    group: group,
  };
  conversationExchanges.forEach(block => {
    const time = createTimeItem(
      block,
      itemConfiguration.width,
      itemConfiguration.positionAcc,
    );

    itemConfiguration.positionAcc += time.height;
    ret.push(time);
    block.exchanges.forEach(exchange => {
      // SIMPLE ARRAY
      for (const index of exchange.messages.keys()) {
        const item = createSkBubbleFromExchange(
          itemConfiguration,
          exchange,
          index,
        );
        ret.push(item);
        itemConfiguration.positionAcc += item.height + item.paddingBottom;
      }
    });
  });

  return ret;
};

export const createSkBubbleFromExchange = (
  itemConfiguration: ItemConfigurationType,
  exchange: ExchangeBlockType,
  index: number,
) => {
  let message = exchange.messages[index];
  const hasTail = index === exchange.messages.length - 1;
  if (!isMessageWithMeta(message)) {
    message = {type: DigestedItemTypes.STRING, message: message};
  }
  return SkMessageItem(itemConfiguration, message, exchange.name, hasTail);
};

export const createSkBubbleFromMessage = (
  itemConfiguration: ItemConfigurationType,
  message: MessageType,
  name: CONTACT_NAMES,
  tail: boolean,
) => {
  if (!isMessageWithMeta(message)) {
    message = {type: DigestedItemTypes.STRING, message: message};
  }
  return SkMessageItem(itemConfiguration, message, name, tail);
};

type SnapshotResolverType = {
  offset: number;
  arr: DigestedConversationListItem[];
};
export const resolveSnapshots = async (
  digested: DigestedConversationListItem[],
) => {
  const resolver = new Promise<SnapshotResolverType>((resolve, reject) => {
    resolve({
      arr: new Array(),
      offset: 0,
    });
  });
  const resolved = await digested.reduce(
    resolveSnapshotAndUpdateOffset,
    resolver,
  );
  return resolved.arr;
};

export const digestPath = (path: ExchangeBlockType[]) => {
  return path.reduce((acc, block) => {
    for (const [index, message] of block.messages.entries()) {
      const tail = block.messages.length - 1 === index;
      acc.push({name: block.name, messageContent: message, tail: tail});
    }
    return acc;
  }, [] as AddMessagePayloadType[]);
};

const resolveSnapshotAndUpdateOffset = async (
  memo: Promise<{
    offset: number;
    arr: DigestedConversationListItem[];
  }>,
  item: DigestedConversationListItem,
) => {
  const acc = await memo;
  if (item.type !== DigestedItemTypes.SNAPSHOT) {
    item.offset += acc.offset;
    acc.arr.push(item);
    return acc;
  } else {
    const path = getSnapshotPath(item.content.filename);
    const exists = await ReactNativeBlobUtil.fs.exists(path);
    if (!exists) {
      acc.arr.push(item);
      return acc;
    }
    const data = await ReactNativeBlobUtil.fs.readFile(path, 'base64');
    const image = Skia.Image.MakeImageFromEncoded(Skia.Data.fromBase64(data));
    if (!image) {
      acc.arr.push(item);
      return acc;
    }
    const aspectRation = image.height() / image.width();
    const imageHeight = item.width * aspectRation;
    acc.offset += imageHeight;
    item.height = imageHeight;
    item.content.image = image;
    item.content = Object.assign({}, {...item.content}, {image: image});
    acc.arr.push(item);
    return acc;
  }
};
