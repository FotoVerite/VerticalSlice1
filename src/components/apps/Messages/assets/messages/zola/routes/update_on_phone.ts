import {EventBasedRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ZARA_ROUTE_IDS} from './routes';

export const update_on_the_phone: EventBasedRouteType = {
  id: ZARA_ROUTE_IDS.UPDATE_ON_PHONE,
  delay: 1000,
  conditions: {
    [CONTACT_NAMES.SPAM3]: {
      blocked: true,
    },
  },
  exchanges: [
    {
      name: CONTACT_NAMES.ZOLA,
      messages: ["How's the phone situation"],
    },
  ],
};
