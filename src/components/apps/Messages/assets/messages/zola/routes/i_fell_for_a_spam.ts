import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ZARA_ROUTE_IDS} from './routes';
import {SPAM1_FIRST_EXCHANGE_OPTIONS} from '../../spam1/routes/spam1_exchange_one';
import {SPAM1_IDS} from '../../spam1/routes/routes';

export enum ZARA_I_FELL_FOR_SPAM_OPTIONS {
  A = 'I actually fell for a spam txt',
}

const OPTIONS = ZARA_I_FELL_FOR_SPAM_OPTIONS;
const ZARA = CONTACT_NAMES.ZOLA;
const SELF = CONTACT_NAMES.SELF;

export const i_fell_for_a_spam: MessageRouteType = {
  id: ZARA_ROUTE_IDS.I_FELL_FOR_SPAM,
  options: Object.values(OPTIONS),
  conditions: {
    [CONTACT_NAMES.SPAM1]: {
      routes: {
        [SPAM1_IDS.EXCHANGE_ONE]: [
          SPAM1_FIRST_EXCHANGE_OPTIONS.A,
          SPAM1_FIRST_EXCHANGE_OPTIONS.B,
          SPAM1_FIRST_EXCHANGE_OPTIONS.C,
        ],
      },
    },
  },
  routes: {
    [OPTIONS.A]: [
      {name: SELF, messages: [OPTIONS.A]},
      {name: ZARA, messages: ['I always wondered who those people were.']},
      {
        name: SELF,
        messages: [
          'I guess one response back isn’t falling for them. I just feel dumb, like accidentally picking up a scam likely call.',
        ],
      },
      {
        name: ZARA,
        messages: [
          'Oh but I love them, Scam’s great parties, if a bit awkward and prone to repeating themself. I remember last time they were just droning on and on about this Nigerian Prince they met.',
        ],
      },
      {
        name: SELF,
        messages: ['I mean if you want to clear a room they’re your guy.'],
      },
    ],
  },
};
