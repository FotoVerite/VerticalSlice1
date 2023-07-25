import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {GREG_ROUTE_IDS} from './routes';

export enum FIRST_OPTIONS {
  A = 'No',
  B = 'I just started looking',
  C = 'BLERG',
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

export const first_message: MessageRouteType = {
  id: GREG_ROUTE_IDS.FIRST,
  options: Object.values(FIRST_OPTIONS),
  routes: {
    [FIRST_OPTIONS.A]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [FIRST_OPTIONS.A as string],
      },
    ].concat(exchanges),

    [FIRST_OPTIONS.B]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [FIRST_OPTIONS.B as string],
      },
    ].concat(exchanges),
    [FIRST_OPTIONS.C]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [FIRST_OPTIONS.B as string],
      },
    ].concat(exchanges),
  },
};
