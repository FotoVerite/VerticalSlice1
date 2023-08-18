import {EventBasedRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {LENNY_ROUTE_IDS} from './routes';
import {LEO_ROUTE_IDS} from '../../leo/routes/routes';
import {ZARA_ROUTE_IDS} from '../../zola/routes/routes';

export const lenny_want_to_hear_something_scary: EventBasedRouteType = {
  id: LENNY_ROUTE_IDS.WANT_TO_HEAR_SOMETHING_SCARY,
  delay: 2000,
  conditions: {
    [CONTACT_NAMES.ZOLA]: {
      routes: {[ZARA_ROUTE_IDS.BORKED_PHONE]: {finished: true}},
    },
  },
  exchanges: [
    {
      name: CONTACT_NAMES.LENNY,
      messages: ['I read the most fucked up shit on reddit today'],
    },
  ],
};
