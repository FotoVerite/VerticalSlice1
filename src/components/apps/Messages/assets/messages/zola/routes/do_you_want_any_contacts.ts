import {EventBasedRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ZARA_ROUTE_IDS} from './routes';
import {MICHAEL_IDS} from '../../michael/routes/routes';

export const zara_do_you_want_any_contacts: EventBasedRouteType = {
  id: ZARA_ROUTE_IDS.DO_YOU_WANT_ANY_CONTACTS,
  delay: 2500,
  conditions: {
    [CONTACT_NAMES.MICHAEL]: {
      routes: {
        [MICHAEL_IDS.ABOUT_TONIGHT_REPLY]: [],
      },
    },
  },
  exchanges: [
    {
      name: CONTACT_NAMES.ZOLA,
      messages: ['Do you want any of our mutual contacts'],
    },
  ],
};
