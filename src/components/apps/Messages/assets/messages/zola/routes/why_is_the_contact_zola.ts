import {
  ExchangeBlockType,
  MessageRouteType,
} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ZARA_ROUTE_IDS} from './routes';
import {ZARA_FOUND_NOTHING_OPTIONS} from './nothing_found';
import backup from '../ZARA_MESSAGES_SNAPSHOT.png';
import {DigestedItemTypes} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

export enum ZARA_WHY_IS_CONTACT_ZOLA_OPTIONS {
  A = 'Question',
  B = 'I just started looking',
}

const exchanges: ExchangeBlockType[] = [
  {
    name: CONTACT_NAMES.ZOLA,
    messages: ["I'm afraid to ask."],
  },
  {
    name: CONTACT_NAMES.SELF,
    messages: ['Why are you listed in his Contacts as Zola?'],
  },
  {
    name: CONTACT_NAMES.ZOLA,
    messages: ['What?'],
  },
  {
    name: CONTACT_NAMES.SELF,
    messages: [
      'Here',
      {
        type: DigestedItemTypes.SNAPSHOT,
        message: {backup: backup, filename: 'ZARA_MESSAGES_SNAPSHOT'},
      },
    ],
  },
  {
    name: CONTACT_NAMES.ZOLA,
    messages: [
      {
        type: DigestedItemTypes.STRING,
        typingDelay: 5000,
        message: "I don't want to go into that right now. ",
      },
      "Inside joke it's not important",
    ],
  },
  {
    name: CONTACT_NAMES.SELF,
    messages: ['Okay... sure.'],
  },
];

export const why_is_the_contact_zola: MessageRouteType = {
  id: ZARA_ROUTE_IDS.WHY_IS_THE_CONTACT_ZOLA,
  conditions: {
    [CONTACT_NAMES.ZOLA]: {
      routes: {
        [ZARA_ROUTE_IDS.FOUND_NOTHING]: [
          ZARA_FOUND_NOTHING_OPTIONS.A,
          ZARA_FOUND_NOTHING_OPTIONS.B,
        ],
      },
    },
  },
  options: Object.values(ZARA_WHY_IS_CONTACT_ZOLA_OPTIONS),
  routes: {
    [ZARA_WHY_IS_CONTACT_ZOLA_OPTIONS.A]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [ZARA_WHY_IS_CONTACT_ZOLA_OPTIONS.A as string],
      },
    ].concat(exchanges),
    [ZARA_WHY_IS_CONTACT_ZOLA_OPTIONS.B]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [ZARA_WHY_IS_CONTACT_ZOLA_OPTIONS.A as string],
      },
    ].concat(exchanges),
  },
};
