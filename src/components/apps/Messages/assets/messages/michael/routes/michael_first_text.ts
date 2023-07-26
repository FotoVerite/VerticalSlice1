import {EventBasedRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {MICHAEL_IDS} from './routes';

export const michael_first_text: EventBasedRouteType = {
  id: MICHAEL_IDS.FIRST_TEXT,
  delay: 7500,
  exchanges: [
    {
      name: CONTACT_NAMES.MICHAEL,
      messages: [
        'Yo, so we’re still on for tonight? I can’t believe it’s been two weeks.',
      ],
    },
  ],
};
