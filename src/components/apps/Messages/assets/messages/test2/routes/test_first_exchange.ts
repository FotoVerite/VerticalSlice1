import {DigestedItemTypes} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {
  EventBasedRouteType,
  MessageRouteType,
} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {TEST_ROUTE_IDS} from './routes';

export enum TEST_FIRST_MESSAGE_OPTIONS {
  A = 'Zara?',
}

export const first_message_to_test: EventBasedRouteType = {
  id: TEST_ROUTE_IDS.FIRST_EXCHANGE,
  exchanges: [
    {
      name: CONTACT_NAMES.TEST2,
      messages: ['Zara?'],
    },
  ],
};
