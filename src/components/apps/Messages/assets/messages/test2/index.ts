import {ConversationType} from 'components/apps/Messages/context/types';
import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';
import {TEST_ROUTE_IDS} from './routes/routes';
import {
  TEST_FIRST_MESSAGE_OPTIONS,
  first_message_to_test,
} from './routes/test_first_exchange';

export const testConvo2: ConversationType = {
  name: CONTACT_NAMES.TEST2,
  tags: [],
  heroImage: getAvatarFromContacts(CONTACT_NAMES.TEST2),
  interfaceColor: getColorFromContacts(CONTACT_NAMES.TEST2)[0],
  conditions: {
    [CONTACT_NAMES.TEST]: {
      routes: {
        [TEST_ROUTE_IDS.FIRST_EXCHANGE]: [TEST_FIRST_MESSAGE_OPTIONS.A],
      },
    },
  },
  exchanges: [],
  eventBasedRoutes: [first_message_to_test],
};
