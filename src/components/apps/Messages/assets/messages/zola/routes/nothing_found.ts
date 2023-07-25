import {DigestedItemTypes} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ZARA_ROUTE_IDS} from './routes';
import {ZARA_FIRST_MESSAGE_OPTIONS} from './first_message_to_zara';

export enum ZARA_FOUND_NOTHING_OPTIONS {
  A = 'No',
  B = 'I just started looking',
}

const exchanges = [
  {
    name: CONTACT_NAMES.ZOLA,
    messages: ['Why are you txting me then?'],
  },
  {
    name: CONTACT_NAMES.SELF,
    messages: ['I thought you might have some ideas'],
  },
];

export const nothing_found: MessageRouteType = {
  id: ZARA_ROUTE_IDS.FOUND_NOTHING,
  conditions: {
    [CONTACT_NAMES.ZOLA]: {
      routes: {
        [ZARA_ROUTE_IDS.FIRST_MESSAGE_TO_ZARA]: [ZARA_FIRST_MESSAGE_OPTIONS.A],
      },
    },
  },
  options: Object.values(ZARA_FOUND_NOTHING_OPTIONS),
  routes: {
    [ZARA_FOUND_NOTHING_OPTIONS.A]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [ZARA_FOUND_NOTHING_OPTIONS.A as string],
      },
    ].concat(exchanges),

    [ZARA_FOUND_NOTHING_OPTIONS.B]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [ZARA_FOUND_NOTHING_OPTIONS.B as string],
      },
    ].concat(exchanges),
  },
};
