import {ConversationType} from '../../../context/types';
import zolaAvatar from '@apps/Messages/assets/avatars/Zara.jpg';

import {
  CONTACT_NAMES,
  getColorFromContacts,
} from '../../../context/usersMapping';
import {how_is_the_phone_coming} from './routes/how_is_the_new_phone';
import {borked_phone} from './routes/borked_phone';
import {your_new_video} from './routes/hows_the_new_video';
import {i_dont_know_what_to_do_with_myself} from './routes/I_really_dont_know_what_to_do_with_myself';
import {i_fell_for_a_spam} from './routes/i_fell_for_a_spam';

export const zola: ConversationType = {
  name: CONTACT_NAMES.ZOLA,
  tags: [CONTACT_NAMES.ZOLA, 'Zara', 'Hopescope', 'Panopticon', 'Ads', 'Money'],
  heroImage: zolaAvatar,
  interfaceColor: getColorFromContacts(CONTACT_NAMES.ZOLA)[0],
  eventBasedRoutes: [how_is_the_phone_coming],
  routes: [
    borked_phone,
    your_new_video,
    i_dont_know_what_to_do_with_myself,
    i_fell_for_a_spam,
  ],
  exchanges: [],
};
