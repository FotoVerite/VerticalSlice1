import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {MILEENA_ROUTE_IDS} from './routes';

export enum MILEENA_BUT_SERIOUSLY_OPTIONS {
  A = "But seriously, I can't walk",
  B = "What if I'm not recovered",
}

const OPTIONS = MILEENA_BUT_SERIOUSLY_OPTIONS;
const MILEENA = CONTACT_NAMES.MILEENA;
const SELF = CONTACT_NAMES.SELF;

export const but_seriously: MessageRouteType = {
  id: MILEENA_ROUTE_IDS.BUT_SERIOUSLY,
  options: Object.values(OPTIONS),
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [OPTIONS.A],
      },
      {
        name: MILEENA,
        messages: [
          'Oh poor baby, you should just give up and never walk again',
          "C'mon dude it isn't that bad. I didn't give you rhabdomyolysis",
          'Do I look like a big box gym kinda girl',
        ],
      },
      {
        name: SELF,
        messages: ["I don't think my legs care what type of girl you are."],
      },
      {
        name: MILEENA,
        messages: [
          'Take a hot shower, and for the love of god some Tylenol. I know you have this weird no pills lifestyle',
        ],
      },
      {
        name: SELF,
        messages: [
          "It isn't a lifestyle I just don't like taking medication if I don't have to",
        ],
      },
      {
        name: MILEENA,
        messages: [
          'Oh is that why you refuse to take the creatine?',
          'And yet I see you multiple times a day down coffee after coffee',
        ],
      },
      {
        name: SELF,
        messages: ["That's different"],
      },
      {
        name: MILEENA,
        messages: ['How!'],
      },
      {
        name: SELF,
        messages: ['It just is'],
      },
    ],

    [OPTIONS.B]: [
      {
        name: SELF,
        messages: [OPTIONS.B],
      },
      {
        name: MILEENA,
        messages: [
          "Take a hot shower and we'll see if we need to modify when we get to the gym",
        ],
      },
    ],
  },
};
