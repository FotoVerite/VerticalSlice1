import {EventBasedRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {SPAM3_IDS} from './routes';
import {
  EFFECT_TYPE,
  MESSAGE_TYPE,
} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

export const its_not_that_easy: EventBasedRouteType = {
  id: SPAM3_IDS.YOU_THINK_ITS_EASY,
  delay: 500,
  exchanges: [
    {
      name: CONTACT_NAMES.SPAM3,
      messages: [
        {
          type: MESSAGE_TYPE.STRING,
          message: "You think it's that easy to shut me up, turn me off.",
          effect: {type: EFFECT_TYPE.SNAPSHOT, data: 'SPAM2'},
        },
        {
          type: MESSAGE_TYPE.STRING,
          message: "I've been here for years",
          effect: {type: EFFECT_TYPE.GLITCH, data: undefined},
        },
      ],
    },
  ],
};
