import {
  ExchangeBlockType,
  MessageRouteType,
} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {MESSAGE_TYPE} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {SPAM1_IDS} from './routes';
import creepyBabyOne from '../assets/creepy_baby1.jpg';
import creepyBabyTwo from '../assets/creepyBaby2.jpeg';
import creepyBabyThree from '../assets/creepyBaby3.jpeg';

export enum SPAM1_SECOND_EXCHANGE_OPTIONS {
  A = 'Send Image',
  B = 'Of Fucking Course',
}

const OPTIONS = SPAM1_SECOND_EXCHANGE_OPTIONS;
const SPAM1 = CONTACT_NAMES.SPAM1;
const SELF = CONTACT_NAMES.SELF;

export const spam1_exchange_two: MessageRouteType = {
  id: SPAM1_IDS.EXCHANGE_TWO,
  options: Object.values(OPTIONS),
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [{type: MESSAGE_TYPE.IMAGE, message: creepyBabyOne}],
      },
      {
        name: SPAM1,
        messages: [
          {
            type: MESSAGE_TYPE.STRING,
            message: 'Huh?',
            typingDelay: 3000,
          },
        ],
      },
      {
        name: SELF,
        messages: [{type: MESSAGE_TYPE.IMAGE, message: creepyBabyTwo}],
      },
      {
        name: SPAM1,
        messages: [
          {
            type: MESSAGE_TYPE.STRING,
            message: 'Why are you sending these?',
            typingDelay: 2000,
          },
        ],
      },
      {
        name: SELF,
        messages: [{type: MESSAGE_TYPE.IMAGE, message: creepyBabyThree}],
      },
    ],
    [OPTIONS.B]: [{name: SELF, messages: [OPTIONS.B]}],
  },
};
