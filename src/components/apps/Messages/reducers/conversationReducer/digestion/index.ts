import {SkFont, Skia} from '@shopify/react-native-skia';
import {getSnapshotPath} from 'components/Snapshot/context';
import {createTimeItem} from 'components/apps/Messages/reducers/conversationReducer/digestion/TimeItem';
import {
  DigestedConversationListItem,
  MESSAGE_TYPE,
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
import {SkMessageItem} from './SkMessageItem';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {
  getSeenRoutes,
  RouteObjectType,
  isMessageWithMeta,
  getUnfinishedRouteID,
} from '../routing/seen';
import {findAvailableRoutes} from '../routing/available';
import {
  convertMessageToString,
  digestPathFromUnfinishedID,
} from 'components/apps/Messages/context/conversationFunctions';
import {
  EVENTS_REDUCER_ACTIONS,
  EventOrchestraObjectType,
} from 'components/EventOrchestra/reducers/types';

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
  events: EventOrchestraObjectType,
) => {
  const {exchanges, ...conversationProps} = conversation;

  const digestedExchanges = digestExchanges(
    config,
    exchanges,
    conversationProps.group,
  );
  const digested: DigestedConversationType = Object.assign(conversationProps, {
    exchanges: digestedExchanges,
    routes: conversationProps.routes || [],
    activePath: [],
    availableRoute: findAvailableRoutes(
      conversationProps.name,
      conversationProps.routes || [],
      events,
    )[0],
  });

  digested.exchanges = appendSeenRoutes(digested, events, config);
  const unfinishedID = getUnfinishedRouteID(
    conversationProps.name,
    events,
    conversationProps.routes || [],
  );

  if (unfinishedID) {
    const [time, chosen, seen, pending] = digestPathFromUnfinishedID(
      unfinishedID,
      conversation,
      events,
    );
    if (time && chosen && seen && pending) {
      appendUnfinishedPath(
        digested,
        chosen,
        time,
        seen || [],
        pending || [],
        unfinishedID,
        config,
      );
    }
  }
  digested.exchanges = await resolveSnapshots(digested.exchanges);
  return digested;
};

const appendUnfinishedPath = (
  digested: DigestedConversationType,
  chosen: string,
  createdAt: Date,
  seen: AddMessagePayloadType[],
  pending: AddMessagePayloadType[],
  routeID: string,
  config: DigestConfigurationType,
) => {
  digested.exchanges = digestPath(
    digested.exchanges,
    seen,
    createdAt,
    digested.group,
    config,
  );
  digested.routeAtIndex = seen.length;
  digested.chosenRoute = chosen;
  if (true) {
    digested.activePath = pending;
    digested.nextMessageInQueue = convertMessageToString(
      pending[0].messageContent,
    );
  } else {
    digested.eventAction = {
      type: EVENTS_REDUCER_ACTIONS.MESSAGE_APP_ROUTE_UPDATE,
      payload: {
        routeId: routeID,
        name: digested.name,
        finished: true,
      },
    };
  }
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
    time: route.createdAt.toISOString(),
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

export const digestPath = (
  exchanges: DigestedConversationListItem[],
  payloads: AddMessagePayloadType[],
  time: Date,
  group: boolean = false,
  configuration: DigestConfigurationType,
) => {
  const offset = getListHeight(exchanges);
  const ret: DigestedConversationListItem[] = [];
  const itemConfiguration: ItemConfigurationType = {
    font: configuration.font,
    emojiFont: configuration.emojiFont,
    width: configuration.width,
    positionAcc: offset,
    group: group,
  };

  const timeBlock: ConversationExchangeType = {
    time: time.toISOString(),
    exchanges: [],
  };
  const timeExchange = createTimeItem(
    timeBlock,
    itemConfiguration.width,
    itemConfiguration.positionAcc,
  );

  itemConfiguration.positionAcc += timeExchange.height;
  ret.push(timeExchange);
  for (const exchange of payloads) {
    const item = createSkBubbleFromMessage(
      itemConfiguration,
      exchange.messageContent,
      exchange.name,
      exchange.tail,
    );
    ret.push(item);
    itemConfiguration.positionAcc += item.height + item.paddingBottom;
  }
  return exchanges.concat(ret);
};

export const createSkBubbleFromExchange = (
  itemConfiguration: ItemConfigurationType,
  exchange: ExchangeBlockType,
  index: number,
) => {
  let message = exchange.messages[index];
  const hasTail = index === exchange.messages.length - 1;
  if (!isMessageWithMeta(message)) {
    message = {type: MESSAGE_TYPE.STRING, message: message};
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
    message = {type: MESSAGE_TYPE.STRING, message: message};
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

export const convertToPathExchanges = (path: ExchangeBlockType[]) => {
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
  if (item.type !== MESSAGE_TYPE.SNAPSHOT) {
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
