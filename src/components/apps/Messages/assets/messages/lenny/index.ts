import {ConversationType} from '../../../context/types';

import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from '../../../context/usersMapping';
import {lenny_midnight_society} from './routes/lenny_midnight_society';
import {lenny_want_to_hear_something_scary} from './routes/want_to_hear_something_scary';

export const lenny: ConversationType = {
  name: CONTACT_NAMES.LENNY,
  tags: [CONTACT_NAMES.LENNY],
  heroImage: getAvatarFromContacts(CONTACT_NAMES.LENNY),
  interfaceColor: getColorFromContacts(CONTACT_NAMES.LENNY)[0],
  eventBasedRoutes: [lenny_want_to_hear_something_scary],
  exchanges: [],
  routes: [lenny_midnight_society],
};
