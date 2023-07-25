import {ConversationType} from '../../../context/types';
import zolaAvatar from '@apps/Messages/assets/avatars/Zara.jpg';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';
import panopticon from '@apps/Messages/assets/messages/zola/pantopitcon.jpeg';

import {
  CONTACT_NAMES,
  getColorFromContacts,
} from '../../../context/usersMapping';
import {advertisementExchange} from './advertisment';
import {skincare} from './skincare';
import {first_message_to_zara} from './routes/first_message_to_zara';
import {DigestedItemTypes} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {nothing_found} from './routes/nothing_found';
import {why_is_the_contact_zola} from './routes/why_is_the_contact_zola';
import {why_are_you_in_his_apartment} from './routes/why_are_you_in_his_apartment';
import {can_you_please_help_me} from './routes/can_you_please_help_me';
import {how_is_the_phone_coming} from './routes/how_is_the_new_phone';
import {borked_phone} from './routes/borked_phone';

export const zola: ConversationType = {
  name: CONTACT_NAMES.ZOLA,
  tags: [CONTACT_NAMES.ZOLA, 'Zara', 'Hopescope', 'Panopticon', 'Ads', 'Money'],
  heroImage: zolaAvatar,
  interfaceColor: getColorFromContacts(CONTACT_NAMES.ZOLA)[0],
  eventBasedRoutes: [how_is_the_phone_coming],
  routes: [borked_phone],
  exchanges: [],
};
