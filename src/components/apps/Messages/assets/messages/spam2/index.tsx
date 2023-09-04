import {ConversationType} from '../../../context/types';

import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from '../../../context/usersMapping';
import {CHRIS_ROUTE_IDS} from '../chris/routes/routes';
import {spam2_first_exchange} from './routes/first_exchange';
import {you_disgust_me} from './routes/you_digust_me';

export const spam2: ConversationType = {
  name: CONTACT_NAMES.SPAM2,
  tags: [CONTACT_NAMES.SPAM2],
  //   conditions: {
  //     [CONTACT_NAMES.CHRIS]: {
  //       routes: {
  //         [CHRIS_ROUTE_IDS.HAVE_YOU_LISTENED_TO_THE_CUT]: {},
  //       },
  //     },
  //   },
  heroImage: getAvatarFromContacts(CONTACT_NAMES.SPAM2),
  interfaceColor: getColorFromContacts(CONTACT_NAMES.SPAM2)[0],
  eventBasedRoutes: [you_disgust_me],
  exchanges: [],
  routes: [spam2_first_exchange],
};

const garbled = "Ŷ̴̨͔̣̮̪̱͙̫̼̣̟͜o̴̬̽̀̊̋̇̒͑̃̏̈́̐ư̶͚͕̩͈̗͎͙̼̫̹͛̓̍́̈́̚'̴̠͈̺͇͉̏͜l̶͍̩͈͓͇͆̀̀̓͠͠l̶̡͓̪͉̩͕̩̪̥̝̥̱̅͋̂̆͗̊̈͋̑̚͠ ̷̛̛͙̺͇̤̪̭̱͒̋̑̀͆̓͂͌̋͑͘͜͝n̶͙̺̩̹̼̟͙̦̂ḙ̴̡͛͝v̵̧̨͔̪̯͚̖̭͓̞̩̮̱́͘ḙ̵̡̭͕̥̬̣̭͓͠ŗ̴͙̹̹̇͐̓͂̎̇̆͗̀̌̆ ̵̗̱̪̝̃́̇̍̇̈́̽̈́̆̌͜b̴̢̧̛͇͚̘̯̼̣̣̰̪̪̯̹̽͐̐͋̌͑͘̕è̸̡̧̘̠͕̩̹̗̫͚̞̇̈́̃͆̊̚͘ ̷̢̤̲͎͚̠̮̮̤̤̬̍g̸̢͕̹̥̦͓̭͈̮̩̥͇̱̿̈́͑̓͂̾͒̈́͌̇̅ͅơ̷̡̤͎͇̝̺͎̪͎̦͇̟͌̌͛̎̀̑̑͑̉͛͜o̴̧̺̰̍̆̈́͗̇͋̐͑̏̑͝d̶̢̧̨̝̞̖̲͇̫̰̭̬͕̈́͒͗̕͜ͅ ̸̤̟̩̝̼̮͓̪̞͔̇̅̀̀̄̚͘̚͠ȩ̸̡̺̲̤̩͈͉̼̍̋̽͂̀ͅñ̷̨̛̛̰̟̬̰͕̝̜͉̰̟͇̳̀̏̔̌̽̕͠͝ǫ̴̼͚̼̱͈͚̥̩̪̯͂̅͒͒̅ư̴̜̭͓̅͊̌̒̒͋g̶̳͇̐̊̚h̶̨̫͉̦̬͎͕͇̲͎͋͑͒̒̿̓";
