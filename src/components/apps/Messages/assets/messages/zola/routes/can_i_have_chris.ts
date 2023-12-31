import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ZARA_ROUTE_IDS} from './routes';
import {MESSAGE_TYPE} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {chris} from '../../chris';
import {ZARA_CONTACT_CONVERSATIONS_OPTIONS} from './contact_conversation';

export enum ZARA_I_NEED_CHRIS_OPTIONS {
  A = "I actually could use Chris' contact also",
}

const OPTIONS = ZARA_I_NEED_CHRIS_OPTIONS;
const ZARA = CONTACT_NAMES.ZOLA;
const SELF = CONTACT_NAMES.SELF;

export const can_i_have_chris: MessageRouteType = {
  id: ZARA_ROUTE_IDS.CAN_I_HAVE_CHRIS,
  options: Object.values(OPTIONS),
  conditions: {
    [CONTACT_NAMES.ZOLA]: {
      routes: {
        [ZARA_ROUTE_IDS.CONTACT_CONVERSATION]: {
          not_chosen: [ZARA_CONTACT_CONVERSATIONS_OPTIONS.B],
        },
      },
    },
  },
  routes: {
    [OPTIONS.A]: [
      {name: SELF, messages: [OPTIONS.A]},
      {
        name: ZARA,
        messages: [
          'Alrighty.',
          {
            type: MESSAGE_TYPE.VCARD,
            message: chris,
          },
        ],
      },
    ],
  },
};
