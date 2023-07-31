import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ZARA_ROUTE_IDS} from './routes';
import {SPAM1_FIRST_EXCHANGE_OPTIONS} from '../../spam1/routes/spam1_exchange_one';
import {SPAM1_IDS} from '../../spam1/routes/routes';
import {MESSAGE_TYPE} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {mileena} from '../../mileena';
import {chris} from '../../chris';

export enum ZARA_CONTACT_CONVERSATIONS_OPTIONS {
  A = 'Yeah, give me Mileena',
  B = 'Yeah I need to talk to Chris',
}

const OPTIONS = ZARA_CONTACT_CONVERSATIONS_OPTIONS;
const ZARA = CONTACT_NAMES.ZOLA;
const SELF = CONTACT_NAMES.SELF;

export const zara_contact_conversation: MessageRouteType = {
  id: ZARA_ROUTE_IDS.CONTACT_CONVERSATION,
  options: Object.values(OPTIONS),
  conditions: {
    [CONTACT_NAMES.ZOLA]: {
      routes: {
        [ZARA_ROUTE_IDS.DO_YOU_WANT_ANY_CONTACTS]: {},
      },
    },
  },
  routes: {
    [OPTIONS.A]: [
      {name: SELF, messages: [OPTIONS.A]},
      {
        name: ZARA,
        messages: [
          'Okay.',
          {
            type: MESSAGE_TYPE.VCARD,
            message: mileena,
            reaction: {name: 'heart', color: '#dc1d1d', delay: 3000},
          },
        ],
      },
    ],
    [OPTIONS.B]: [
      {name: SELF, messages: [OPTIONS.B]},
      {
        name: ZARA,
        messages: [
          'Okay.',
          {
            type: MESSAGE_TYPE.VCARD,
            message: chris,
            reaction: {name: 'heart', color: '#dc1d1d', delay: 3000},
          },
        ],
      },
    ],
  },
};
