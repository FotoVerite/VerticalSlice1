import chrisAvatar from '@apps/Messages/assets/avatars/Chris.jpg';

import {ConversationType} from 'components/apps/Messages/context/types';
import {
  CONTACT_NAMES,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';
import {have_you_listened_to_my_cut} from './routes/have_you_listened_to_the_cut';

export const chris: ConversationType = {
  name: CONTACT_NAMES.CHRIS,
  tags: [],
  routes: [have_you_listened_to_my_cut],
  heroImage: chrisAvatar,
  interfaceColor: getColorFromContacts(CONTACT_NAMES.CHRIS)[0],
  exchanges: [],
};
