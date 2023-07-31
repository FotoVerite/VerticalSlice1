import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ZARA_ROUTE_IDS} from './routes';
import {MESSAGE_TYPE} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {mileena} from '../../mileena';

export enum ZARA_CAN_I_HAVE_MILEENA {
  A = "Can I have Mel's number also.",
}

const OPTIONS = ZARA_CAN_I_HAVE_MILEENA;
const ZARA = CONTACT_NAMES.ZOLA;
const SELF = CONTACT_NAMES.SELF;

export const can_i_have_mileena: MessageRouteType = {
  id: ZARA_ROUTE_IDS.CAN_I_HAVE_MILEENA,
  options: Object.values(OPTIONS),
  conditions: {
    [CONTACT_NAMES.ZOLA]: {
      routes: {
        [ZARA_ROUTE_IDS.CONTACT_CONVERSATION]: {
          not_chosen: [ZARA_CAN_I_HAVE_MILEENA.A],
        },
      },
    },
  },
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [OPTIONS.A, 'I need to talk to her about our workout'],
      },
      {
        name: ZARA,
        messages: [
          'Ok, let me know if you need anyone else.',
          {type: MESSAGE_TYPE.EMOJI, message: '🏋🏼‍♀️'},

          {
            type: MESSAGE_TYPE.VCARD,
            message: mileena,
          },
        ],
      },
    ],
  },
};
