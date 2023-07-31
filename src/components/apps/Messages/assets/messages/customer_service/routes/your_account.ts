import {EventBasedRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {CUSTOMER_SERVICE_IDS} from './types';
import {
  EFFECT_TYPE,
  MESSAGE_TYPE,
} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

export const cs_your_account: EventBasedRouteType = {
  id: CUSTOMER_SERVICE_IDS.YOUR_ACCOUNT_IS_NOW_UNLOCKED,
  exchanges: [
    {
      name: CONTACT_NAMES.CUSTOMER_SERVICE,
      messages: [
        {
          type: MESSAGE_TYPE.STRING,
          message: 'Your account is now unlocked.',
        },
      ],
    },
  ],
};
