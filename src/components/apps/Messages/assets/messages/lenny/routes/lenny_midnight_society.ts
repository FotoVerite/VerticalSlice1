import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {LENNY_ROUTE_IDS} from './routes';

const LENNY = CONTACT_NAMES.LENNY;
const SELF = CONTACT_NAMES.SELF;

enum OPTIONS {
  A = 'Bro, please not today',
  B = "Okay, I'll bite",
  C = 'Can you just link the fucking post',
}

const exchanges: ExchangeBlockType[] = [
  {
    name: LENNY,
    messages: ['First this meeting of the midnight society I present'],
  },
  {
    name: LENNY,
    messages: [
      'People have been hearing whispers and screams coming from their phone',
    ],
  },
  {
    name: LENNY,
    messages: [
      'Most swear that there was no app running into the background, and some have posted videos of the phone being completely off while demonic howls are coming from it.',
      'There no describable language, just guttural pain',
      'A lot of the people talk about a deep depression happening after these events or strange texts coming in',
    ],
  },
];

export const lenny_midnight_society: MessageRouteType = {
  id: LENNY_ROUTE_IDS.MIDNIGHT_SOCIETY,
  options: Object.values(OPTIONS),
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [OPTIONS.A],
      },
      {
        name: LENNY,
        messages: ['What you mean by that'],
      },
      {
        name: SELF,
        messages: [
          "That I'm not in the mood for some lame ass reddit copypasta faked karama farm",
          "You're just going to cite me a twist on lake city quiet pills or something",
        ],
      },
      {
        name: LENNY,
        messages: [
          'A. Lake City Quiet Pills is real.',
          'B. This is waaaay better ',
        ],
      },
    ].concat(exchanges),
    [OPTIONS.B]: [
      {
        name: SELF,
        messages: [OPTIONS.B],
      },
    ].concat(exchanges),
    [OPTIONS.C]: [
      {
        name: SELF,
        messages: [OPTIONS.C],
      },
      {
        name: LENNY,
        messages: [
          'No I will not, that takes away all the magic',
          "You'll just read the 1000s of comments trying to debunk it and not even glance at the main post.",
          'Besides I need to work on my iteration techniques',
        ],
      },
      {
        name: LENNY,
        messages: ['I know you too well'],
      },
      {
        name: LENNY,
        messages: ['I need to work on my storytelling techniques anyway'],
      },
    ].concat(exchanges),
  },
};
