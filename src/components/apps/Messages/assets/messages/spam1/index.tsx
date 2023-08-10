import React from 'react';
import {EFFECT_TYPE} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {ConversationType} from '../../../context/types';

import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from '../../../context/usersMapping';
import {ZARA_ROUTE_IDS} from '../zola/routes/routes';
import {spam1_exchange_one} from './routes/spam1_exchange_one';
import {spam1_introduction} from './routes/spam_introduction';
import {P} from 'common/styles/StyledText';
import {Jumbled} from 'components/apps/Messages/Effects/Jumbled';

export const spam1: ConversationType = {
  name: CONTACT_NAMES.SPAM1,
  tags: [CONTACT_NAMES.SPAM1],
  conditions: {
    [CONTACT_NAMES.ZOLA]: {
      routes: {
        [ZARA_ROUTE_IDS.YOUR_NEW_VIDEO]: {},
      },
    },
  },
  effects: [
    {
      type: EFFECT_TYPE.LOGLINE_REPLACEMENT,
      conditions: {
        [CONTACT_NAMES.MICHAEL]: {views: {gt: 1}},
        [CONTACT_NAMES.ZOLA]: {views: {gt: 8}},
      },
      data: <Jumbled message="You'll never be good enough" />,
    },
    {
      type: EFFECT_TYPE.LOGLINE_REPLACEMENT,
      conditions: {[CONTACT_NAMES.MICHAEL]: {views: {gt: 1}}},
      data: <P>You're not the one</P>,
    },
  ],
  heroImage: getAvatarFromContacts(CONTACT_NAMES.SPAM1),
  interfaceColor: getColorFromContacts(CONTACT_NAMES.SPAM1)[0],
  eventBasedRoutes: [spam1_introduction],
  exchanges: [],
  routes: [spam1_exchange_one],
};

const garbled = "Ŷ̴̨͔̣̮̪̱͙̫̼̣̟͜o̴̬̽̀̊̋̇̒͑̃̏̈́̐ư̶͚͕̩͈̗͎͙̼̫̹͛̓̍́̈́̚'̴̠͈̺͇͉̏͜l̶͍̩͈͓͇͆̀̀̓͠͠l̶̡͓̪͉̩͕̩̪̥̝̥̱̅͋̂̆͗̊̈͋̑̚͠ ̷̛̛͙̺͇̤̪̭̱͒̋̑̀͆̓͂͌̋͑͘͜͝n̶͙̺̩̹̼̟͙̦̂ḙ̴̡͛͝v̵̧̨͔̪̯͚̖̭͓̞̩̮̱́͘ḙ̵̡̭͕̥̬̣̭͓͠ŗ̴͙̹̹̇͐̓͂̎̇̆͗̀̌̆ ̵̗̱̪̝̃́̇̍̇̈́̽̈́̆̌͜b̴̢̧̛͇͚̘̯̼̣̣̰̪̪̯̹̽͐̐͋̌͑͘̕è̸̡̧̘̠͕̩̹̗̫͚̞̇̈́̃͆̊̚͘ ̷̢̤̲͎͚̠̮̮̤̤̬̍g̸̢͕̹̥̦͓̭͈̮̩̥͇̱̿̈́͑̓͂̾͒̈́͌̇̅ͅơ̷̡̤͎͇̝̺͎̪͎̦͇̟͌̌͛̎̀̑̑͑̉͛͜o̴̧̺̰̍̆̈́͗̇͋̐͑̏̑͝d̶̢̧̨̝̞̖̲͇̫̰̭̬͕̈́͒͗̕͜ͅ ̸̤̟̩̝̼̮͓̪̞͔̇̅̀̀̄̚͘̚͠ȩ̸̡̺̲̤̩͈͉̼̍̋̽͂̀ͅñ̷̨̛̛̰̟̬̰͕̝̜͉̰̟͇̳̀̏̔̌̽̕͠͝ǫ̴̼͚̼̱͈͚̥̩̪̯͂̅͒͒̅ư̴̜̭͓̅͊̌̒̒͋g̶̳͇̐̊̚h̶̨̫͉̦̬͎͕͇̲͎͋͑͒̒̿̓";
