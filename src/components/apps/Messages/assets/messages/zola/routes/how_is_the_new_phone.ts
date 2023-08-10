import {EventBasedRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ZARA_ROUTE_IDS} from './routes';
import {LEO_ROUTE_IDS} from '../../leo/routes/routes';

export const how_is_the_phone_coming: EventBasedRouteType = {
  id: ZARA_ROUTE_IDS.HOW_IS_THE_PHONE_COMING,
  delay: 1000,
  conditions: {
    [CONTACT_NAMES.LEO]: {
      routes: {[LEO_ROUTE_IDS.FIRST_MONOLOGUE]: {finished: true}},
    },
  },
  exchanges: [
    {
      name: CONTACT_NAMES.ZOLA,
      messages: ['How is the phone coming along?'],
    },
  ],
};
