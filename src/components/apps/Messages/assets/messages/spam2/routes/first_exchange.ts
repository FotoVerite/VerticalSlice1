import {
  ExchangeBlockType,
  MessageRouteType,
} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {MESSAGE_TYPE} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {SPAM2_IDS} from './routes';
import SPAM2_image from '../assets/SPAM2.png';

export enum SPAM2_FIRST_EXCHANGE_OPTIONS {
  A = 'Excuse me?!',
}

const OPTIONS = SPAM2_FIRST_EXCHANGE_OPTIONS;
const SPAM2 = CONTACT_NAMES.SPAM2;
const SELF = CONTACT_NAMES.SELF;

export const SPAM2_BLOCKABLE_TRIGGER_MESSAGE =
  'You cheat on your partner, you lie to your friends, you lie to yourself Cynthia';

export const spam2_first_exchange: MessageRouteType = {
  id: SPAM2_IDS.FIRST_EXCHANGE,
  options: Object.values(OPTIONS),
  routes: {
    [OPTIONS.A]: [
      {name: SELF, messages: [OPTIONS.A]},
      {
        name: SPAM2,
        messages: [
          'You hear me.',
          "You've got it all figured out Angelica",
          'You disgust me you know that',
        ],
      },
      {
        name: SELF,
        messages: ['I think you...'],
      },
      {
        name: SPAM2,
        messages: [SPAM2_BLOCKABLE_TRIGGER_MESSAGE],
      },
      {
        name: SPAM2,
        messages: [
          'You think you are so perfect',
          'You think you deserve more the me.',
          'You think, and you do, and you steal and you cheat',
          "You're lazy",
          'You take no accountability',
          'You care about nothing but yourself',
          "You think the rule don't apply to you but they do",
        ],
      },
    ],
  },
};
