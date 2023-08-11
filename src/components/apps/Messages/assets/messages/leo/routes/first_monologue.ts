import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {EFFECT_TYPE} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {LEO_ROUTE_IDS} from './routes';
import {ZARA_ROUTE_IDS} from '../../zola/routes/routes';
import {
  leo_monologue_replacement_four,
  leo_monologue_replacement_one,
  leo_monologue_replacement_three,
  leo_monologue_replacement_two,
} from './monologue_replacement';
import {MILEENA_ROUTE_IDS} from '../../mileena/routes/routes';

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
        [OPTIONS.A]: leo_monologue_replacement_one,
      },
      conditions: {
        [CONTACT_NAMES.ZOLA]: {
          views: {gt: 0, lt: 5},
          routes: {[ZARA_ROUTE_IDS.BORKED_PHONE]: {}},
        },
      },
    },
    {
      type: EFFECT_TYPE.FULL_REPLACEMENT,
      data: {
        [OPTIONS.A]: leo_monologue_replacement_two,
      },
      conditions: {
        [CONTACT_NAMES.ZOLA]: {
          views: {gte: 5, lt: 8},
          routes: {[ZARA_ROUTE_IDS.BORKED_PHONE]: {}},
        },
      },
    },
    {
      type: EFFECT_TYPE.FULL_REPLACEMENT,
      data: {
        [OPTIONS.A]: leo_monologue_replacement_three,
      },
      conditions: {
        [CONTACT_NAMES.ZOLA]: {
          views: {gte: 8, lt: 10},
          routes: {[ZARA_ROUTE_IDS.BORKED_PHONE]: {}},
        },
      },
    },
    {
      type: EFFECT_TYPE.FULL_REPLACEMENT,
      data: {
        [OPTIONS.A]: leo_monologue_replacement_four,
      },
      conditions: {
        [CONTACT_NAMES.ZOLA]: {
          views: {gte: 10},
          routes: {
            [ZARA_ROUTE_IDS.BORKED_PHONE]: {},
            [MILEENA_ROUTE_IDS.MY_QUADS]: {},
          },
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
          "I'm just acting",
          "I feel like I'm drowned, my lungs full  of bile and sea water",
          'No room to breath, no direction besides down',
          'God, one hour with my thoughts and this is what I become',
          "I loose access to my account and I don't even know what to do with myself.",
        ],
      },
      {
        name: SELF,
        messages: [
          "I'm just txting myself, and thinking of you",
          "I can't even remember either of my brothers' cell phones",
          "I'm such a looser",
          "I don't know what that says.",
          'I miss you Leo, every day',
          "I know it's not my fault",
          'I know...',
        ],
      },
    ],
  },
};
