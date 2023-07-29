import {
  ExchangeBlockType,
  MessageRouteType,
} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {DigestedItemTypes} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {SPAM1_IDS} from './routes';
import spam1_image from '../assets/spam1.png';

export enum SPAM1_FIRST_EXCHANGE_OPTIONS {
  A = 'New Phone, Who Dis',
  B = 'Sorry, who is this?',
  C = "I'm doing okay. How are you doing today?",
}

const OPTIONS = SPAM1_FIRST_EXCHANGE_OPTIONS;
const SPAM1 = CONTACT_NAMES.SPAM1;
const SELF = CONTACT_NAMES.SELF;

const exchanges: ExchangeBlockType[] = [
  {
    name: SPAM1,
    messages: [
      "Hi my name is Kieori and I'm new to the area.",
      {type: DigestedItemTypes.IMAGE, message: spam1_image},
    ],
  },
  {
    name: SELF,
    messages: ['Of fucking course.'],
  },
];

export const spam1_exchange_one: MessageRouteType = {
  id: SPAM1_IDS.EXCHANGE_ONE,
  options: Object.values(OPTIONS),
  routes: {
    [OPTIONS.A]: [{name: SELF, messages: [OPTIONS.A]}].concat(exchanges),
    [OPTIONS.B]: [{name: SELF, messages: [OPTIONS.B]}].concat(exchanges),
    [OPTIONS.C]: [{name: SELF, messages: [OPTIONS.C]}].concat(exchanges),
  },
};
