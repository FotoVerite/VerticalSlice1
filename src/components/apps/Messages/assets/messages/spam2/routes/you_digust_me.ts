import {EventBasedRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {SPAM2_IDS} from './routes';

export const you_disgust_me: EventBasedRouteType = {
  id: SPAM2_IDS.YOU_DISGUST_ME,
  delay: 500,
  exchanges: [
    {
      name: CONTACT_NAMES.SPAM2,
      messages: ['You disgust me'],
    },
  ],
};
