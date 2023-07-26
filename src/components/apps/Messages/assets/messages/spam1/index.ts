import {ConversationType} from '../../../context/types';

import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from '../../../context/usersMapping';
import {ZARA_YOUR_NEW_VIDEO_OPTIONS} from '../zola/routes/hows_the_new_video';
import {ZARA_ROUTE_IDS} from '../zola/routes/routes';
import {spam1_exchange_one} from './routes/spam1_exchange_one';
import {spam1_introduction} from './routes/spam_introduction';

export const spam1: ConversationType = {
  name: CONTACT_NAMES.SPAM1,
  tags: [CONTACT_NAMES.SPAM1],
  conditions: {
    [CONTACT_NAMES.ZOLA]: {
      routes: {
        [ZARA_ROUTE_IDS.YOUR_NEW_VIDEO]: [
          ZARA_YOUR_NEW_VIDEO_OPTIONS.A,
          ZARA_YOUR_NEW_VIDEO_OPTIONS.B,
          ZARA_YOUR_NEW_VIDEO_OPTIONS.C,
        ],
      },
    },
  },
  heroImage: getAvatarFromContacts(CONTACT_NAMES.SPAM1),
  interfaceColor: getColorFromContacts(CONTACT_NAMES.SPAM1)[0],
  eventBasedRoutes: [spam1_introduction],
  exchanges: [],
  routes: [spam1_exchange_one],
};
