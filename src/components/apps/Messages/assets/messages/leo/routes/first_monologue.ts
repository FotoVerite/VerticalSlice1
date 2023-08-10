import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {EFFECT_TYPE} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {LEO_ROUTE_IDS} from './routes';
import {leo_monologue_replacement} from './monologue_replacement';
import {ZARA_ROUTE_IDS} from '../../zola/routes/routes';

const LEO = CONTACT_NAMES.LEO;
const SELF = CONTACT_NAMES.SELF;

enum OPTIONS {
  A = "I mean I really don't",
}

export const leo_first_monologue: MessageRouteType = {
  id: LEO_ROUTE_IDS.FIRST_MONOLOGUE,
  options: Object.values(OPTIONS),
  effects: [
    {
      type: EFFECT_TYPE.FULL_REPLACEMENT,
      data: {
        [OPTIONS.A]: leo_monologue_replacement,
      },
      conditions: {
        [CONTACT_NAMES.ZOLA]: {
          views: {gt: 0},
          routes: {[ZARA_ROUTE_IDS.BORKED_PHONE]: {}},
        },
      },
    },
  ],
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [OPTIONS.A],
      },
      {
        name: SELF,
        messages: [
          "I act like I have it together, but I don't, not at all",
          // "I feel like I'm drowned, my lungs full of sea water and bile.",
          // 'An anchor, a weight, a promise, tugging me down.',
          // 'Down to the sandy floor, down to an end.',
          // 'but I have to go on, move forward when all I want to do is lay in bed and not think ever again.',
          // "I loose access to my account and I don't even know what to do with myself.",
        ],
      },
      // {
      //   name: SELF,
      //   messages: [
      //     "So, I'm just here txting myself, pretending you can hear me.",
      //     "I can't even remember either of my brothers' cell phones, I'm such a looser",
      //     "I don't know what that says.",
      //     'I miss you Leo, every day',
      //     "I know it's not my fault",
      //     'I know...',
      //   ],
      // },
    ],
  },
};
