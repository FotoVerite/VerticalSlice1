import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {MILEENA_ROUTE_IDS} from './routes';

export enum MILEENA_QUAD_OPTIONS {
  A = 'My quads',
}

const OPTIONS = MILEENA_QUAD_OPTIONS;
const MILEENA = CONTACT_NAMES.MILEENA;
const SELF = CONTACT_NAMES.SELF;

export const my_quads: MessageRouteType = {
  id: MILEENA_ROUTE_IDS.MY_QUADS,
  options: Object.values(OPTIONS),
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [OPTIONS.A],
      },
      {
        name: MILEENA,
        messages: ['Yo yo, that means it’s working.'],
      },
      {
        name: SELF,
        messages: ['We both know DOMS are not a great indicator of anything.'],
      },
      {
        name: MILEENA,
        messages: ['They indicated you actually busted your ass.'],
      },
      {
        name: SELF,
        messages: ['Do I really need to go tomorrow I can barely walk'],
      },
      {
        name: MILEENA,
        messages: [
          'Yup, we aren’t fucking around',
          'We got three months till the vacay and you said you wanted to have abs.',
          'Well this is what we’re doing.',
        ],
      },
      {
        name: SELF,
        messages: ['Did I really say that?'],
      },
      {
        name: MILEENA,
        messages: ['Do you want an audio replay?'],
      },
      {
        name: SELF,
        messages: ["No, I think I'm good."],
      },
    ],
  },
};
