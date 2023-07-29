import {ConversationType} from '../../../context/types';

import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from '../../../context/usersMapping';
import {SPAM1_IDS} from '../spam1/routes/routes';
import {michael_about_tonight_reply} from './routes/michae_about_tonight_reply';
import {michael_first_text} from './routes/michael_first_text';

export const micheal: ConversationType = {
  name: CONTACT_NAMES.MICHAEL,
  tags: [CONTACT_NAMES.MICHAEL, 'love', 'boyfriend', 'sex'],
  heroImage: getAvatarFromContacts(CONTACT_NAMES.MICHAEL),
  interfaceColor: getColorFromContacts(CONTACT_NAMES.MICHAEL)[0],
  conditions: {
    [CONTACT_NAMES.SPAM1]: {
      routes: {
        [SPAM1_IDS.EXCHANGE_ONE]: {},
      },
    },
  },
  eventBasedRoutes: [michael_first_text],
  routes: [michael_about_tonight_reply],
  exchanges: [],
};
