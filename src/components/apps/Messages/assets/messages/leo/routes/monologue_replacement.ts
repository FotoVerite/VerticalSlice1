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
    messages: [OPTIONS.A],
  },
  {
    name: SELF,
    messages: ['I deserve nothing'],
  },
  {
    name: SELF,
    messages: ['Absolutely nothing'],
  },
];
