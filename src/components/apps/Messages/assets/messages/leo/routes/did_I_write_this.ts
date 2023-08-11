import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {EFFECT_TYPE, MESSAGE_TYPE} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {LEO_ROUTE_IDS} from './routes';

const LEO = CONTACT_NAMES.LEO;
const SELF = CONTACT_NAMES.SELF;

enum OPTIONS {
  A = "Did I write this?",
}

export const leo_did_I_write_this: MessageRouteType = {
  id: LEO_ROUTE_IDS.DID_I_WRITE_THIS,
    options: Object.values(OPTIONS),
    conditions: {
        [CONTACT_NAMES.ZOLA]: { views: { gte: 10 } }
    },
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [{type: MESSAGE_TYPE.STRING, message: 'Did I? Did You?, Did I?, Did You?', effect: {type: EFFECT_TYPE.GLITCH}}],
      },
    ],
  },
};
