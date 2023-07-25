import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {TEST_ROUTE_IDS} from './routes';

export enum TEST_FIRST_MESSAGE_OPTIONS {
  A = 'Zara?',
}

export const first_message_to_test: MessageRouteType = {
  id: TEST_ROUTE_IDS.FIRST_EXCHANGE,
  options: Object.values(TEST_FIRST_MESSAGE_OPTIONS),
  routes: {
    [TEST_FIRST_MESSAGE_OPTIONS.A]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: ['Zara?'],
      },
    ],
  },
};
