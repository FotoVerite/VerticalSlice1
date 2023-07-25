import {DigestedItemTypes} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {
  ExchangeBlockType,
  MessageRouteType,
} from 'components/apps/Messages/context/types';
import {
  CONTACT_NAMES,
  getAvatarFromContacts,
} from 'components/apps/Messages/context/usersMapping';
import {CHRIS_ROUTE_IDS} from './routes';

export enum CHRIS_TEST_ROUTE {
  A = 'No',
  B = 'I just started looking',
}

const exchanges: ExchangeBlockType[] = [
  {
    name: CONTACT_NAMES.ZOLA,
    messages: ['Why are you txting me then?'],
  },
  {
    name: CONTACT_NAMES.SELF,
    messages: [
      {
        type: DigestedItemTypes.SNAPSHOT,
        message: {
          backup: getAvatarFromContacts(CONTACT_NAMES.GREG)!,
          filename: 'CHRIS_SNAPSHOT',
        },
      },
    ],
  },
  {
    name: CONTACT_NAMES.ZOLA,
    messages: ['Why are you txting me then?'],
  },
];

export const chris_test_route: MessageRouteType = {
  id: CHRIS_ROUTE_IDS.TEST_ROUTE_CHRIS,
  options: Object.values(CHRIS_TEST_ROUTE),
  routes: {
    [CHRIS_TEST_ROUTE.A]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [CHRIS_TEST_ROUTE.A as string],
      },
    ].concat(exchanges),

    [CHRIS_TEST_ROUTE.B]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [CHRIS_TEST_ROUTE.B as string],
      },
    ].concat(exchanges),
  },
};
