import moment from 'moment';
import {ConversationType} from '../../../context/types';

import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from '../../../context/usersMapping';
import {leo_first_monologue} from './routes/first_monologue';
import {leo_did_I_write_this} from './routes/did_I_write_this';
import {MESSAGE_TYPE} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {mileena} from '../mileena';

export const leo: ConversationType = {
  name: CONTACT_NAMES.LEO,
  tags: [CONTACT_NAMES.LEO],
  heroImage: getAvatarFromContacts(CONTACT_NAMES.LEO),
  interfaceColor: getColorFromContacts(CONTACT_NAMES.LEO)[0],
  eventBasedRoutes: [],
  routes: [leo_first_monologue, leo_did_I_write_this],
  exchanges: [
    {
      time: moment().subtract(5, 'minutes'),
      exchanges: [
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "I don't know what to do with myself",
            //{type: MESSAGE_TYPE.VCARD, message: mileena},
          ],
        },
      ],
    },
  ],
};
