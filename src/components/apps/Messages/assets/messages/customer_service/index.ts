import {ConversationType} from '../../../context/types';

import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from '../../../context/usersMapping';
import {CHRIS_ROUTE_IDS} from '../chris/routes/routes';
import {MILEENA_ROUTE_IDS} from '../mileena/routes/routes';
import {cs_start_restore} from './routes/you_can_start_the_restore';
import {cs_your_account} from './routes/your_account';

export const customer_service: ConversationType = {
  name: CONTACT_NAMES.CUSTOMER_SERVICE,
  tags: [CONTACT_NAMES.CUSTOMER_SERVICE],
  conditions: {
    [CONTACT_NAMES.MILEENA]: {
      routes: {
        [MILEENA_ROUTE_IDS.MY_QUADS]: {},
      },
    },
    [CONTACT_NAMES.CHRIS]: {
      routes: {
        [CHRIS_ROUTE_IDS.HAVE_YOU_LISTENED_TO_THE_CUT]: {},
      },
    },
  },
  heroImage: getAvatarFromContacts(CONTACT_NAMES.SPAM1),
  interfaceColor: getColorFromContacts(CONTACT_NAMES.SPAM1)[0],
  eventBasedRoutes: [cs_your_account, cs_start_restore],
  exchanges: [],
  routes: [],
};
