import React from 'react';
import {EFFECT_TYPE} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {ConversationType} from '../../../context/types';

import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from '../../../context/usersMapping';
import {ZARA_ROUTE_IDS} from '../zola/routes/routes';
import {LENNY_exchange_one} from './routes/LENNY_exchange_one';
import {LENNY_introduction} from './routes/spam_introduction';
import {P} from 'common/styles/StyledText';
import {Jumbled} from 'components/apps/Messages/Effects/Jumbled';

export const LENNY: ConversationType = {
  name: CONTACT_NAMES.LENNY,
  tags: [CONTACT_NAMES.LENNY],
  conditions: {
    [CONTACT_NAMES.ZOLA]: {
      routes: {
        [ZARA_ROUTE_IDS.I_DONT_FEEL_SECURE]: {},
      },
    },
  },
  heroImage: getAvatarFromContacts(CONTACT_NAMES.LENNY),
  interfaceColor: getColorFromContacts(CONTACT_NAMES.LENNY)[0],
  eventBasedRoutes: [],
  exchanges: [],
  routes: [],
};
