import {EventBasedRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {SPAM1_IDS} from './routes';

export const spam1_introduction: EventBasedRouteType = {
  id: SPAM1_IDS.SPAM_INTRODUCTION,
  delay: 1000,
  exchanges: [
    {
      name: CONTACT_NAMES.SPAM1,
      messages: ["How's is today going?"],
    },
  ],
};
