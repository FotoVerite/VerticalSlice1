import {EventBasedRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ZARA_ROUTE_IDS} from './routes';

export const how_is_the_phone_coming: EventBasedRouteType = {
  id: ZARA_ROUTE_IDS.HOW_IS_THE_PHONE_COMING,
  delay: 1000,
  exchanges: [
    {
      name: CONTACT_NAMES.ZOLA,
      messages: ['How is the phone coming along?'],
    },
  ],
};
