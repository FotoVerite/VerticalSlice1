import {
  ExchangeBlockType,
  MessageRouteType,
} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {MESSAGE_TYPE} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import spam1_image from '../assets/spam1.png';
import {LEO_ROUTE_IDS} from './routes';

const LEO = CONTACT_NAMES.LEO;
const SELF = CONTACT_NAMES.SELF;

enum OPTIONS {
  A = "I mean I'm disgusting",
}

export const leo_monologue_replacement = [
  {
    name: SELF,
    messages: [
      "I act like I have it together, but I don't, not at all",
      "I feel like I'm dead, my lungs full of sea water and bile.",
      'An anchor, a weight, a promise, with me down...',
      'Down to the sandy floor, down to an end.',
      'but I have to go on, move forward when all I want to do is lay in bed and not think ever again.',
      "I loose access to my account and I don't even know what to do with myself.",
    ],
  },
  {
    name: SELF,
    messages: [
      "So, I'm just here txting myself, pretending you can hear me.",
      "I can't even remember either of my brothers' cell phones, I'm such a looser",
      "I don't know what that says.",
      'I miss you Leo, every day',
      "I know it's not my fault",
      "I know I'm worthless",
    ],
  },
];
