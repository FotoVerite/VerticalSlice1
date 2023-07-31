import {EventBasedRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {CUSTOMER_SERVICE_IDS} from './types';
import {
  MESSAGE_TYPE,
  EFFECT_TYPE,
} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

export const cs_start_restore: EventBasedRouteType = {
  id: CUSTOMER_SERVICE_IDS.FOLLOW_THIS_LINK_TO_BEGIN_RESTORE_PROCESS,
  delay: 1000,
  conditions: {
    [CONTACT_NAMES.CUSTOMER_SERVICE]: {
      routes: {
        [CUSTOMER_SERVICE_IDS.YOUR_ACCOUNT_IS_NOW_UNLOCKED]: {},
      },
    },
  },
  exchanges: [
    {
      name: CONTACT_NAMES.CUSTOMER_SERVICE,

      messages: [
        {
          type: MESSAGE_TYPE.STRING,
          message: 'You can start the process by following this link',
          effect: {type: EFFECT_TYPE.GLITCH},
        },
      ],
    },
  ],
};
