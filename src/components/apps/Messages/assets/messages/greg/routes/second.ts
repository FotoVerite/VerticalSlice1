import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {GREG_ROUTE_IDS} from './routes';

export enum SECOND_OPTION {
  A = 'TES',
  B = 'I ASDjust started looking',
  C = 'ADS',
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

export const second_message: MessageRouteType = {
  id: GREG_ROUTE_IDS.SECOND,
  options: Object.values(SECOND_OPTION),
  routes: {
    [SECOND_OPTION.A]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [SECOND_OPTION.A as string],
      },
    ].concat(exchanges),

    [SECOND_OPTION.B]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [SECOND_OPTION.B as string],
      },
    ].concat(exchanges),
    [SECOND_OPTION.C]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [SECOND_OPTION.B as string],
      },
    ].concat(exchanges),
  },
};
