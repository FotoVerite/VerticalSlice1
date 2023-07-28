import {DigestedItemTypes} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {ConversationType} from 'components/apps/Messages/context/types';
import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';
import {my_quads} from './routes/my_quads';

export const mileena: ConversationType = {
  name: CONTACT_NAMES.MILEENA,
  tags: [],
  heroImage: getAvatarFromContacts(CONTACT_NAMES.MILEENA),
  interfaceColor: getColorFromContacts(CONTACT_NAMES.MILEENA)[0],
  exchanges: [],
  routes: [my_quads],
};
