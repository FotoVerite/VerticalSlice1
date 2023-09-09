import {
  ConversationType,
  EventBasedRouteType,
  RouteChosenConditionType,
  RouteConditionsType,
} from './types';
import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from './usersMapping';

const garbled = "Ŷ̴̨͔̣̮̪̱͙̫̼̣̟͜o̴̬̽̀̊̋̇̒͑̃̏̈́̐ư̶͚͕̩͈̗͎͙̼̫̹͛̓̍́̈́̚'̴̠͈̺͇͉̏͜l̶͍̩͈͓͇͆̀̀̓͠͠l̶̡͓̪͉̩͕̩̪̥̝̥̱̅͋̂̆͗̊̈͋̑̚͠ ̷̛̛͙̺͇̤̪̭̱͒̋̑̀͆̓͂͌̋͑͘͜͝n̶͙̺̩̹̼̟͙̦̂ḙ̴̡͛͝v̵̧̨͔̪̯͚̖̭͓̞̩̮̱́͘ḙ̵̡̭͕̥̬̣̭͓͠ŗ̴͙̹̹̇͐̓͂̎̇̆͗̀̌̆ ̵̗̱̪̝̃́̇̍̇̈́̽̈́̆̌͜b̴̢̧̛͇͚̘̯̼̣̣̰̪̪̯̹̽͐̐͋̌͑͘̕è̸̡̧̘̠͕̩̹̗̫͚̞̇̈́̃͆̊̚͘ ̷̢̤̲͎͚̠̮̮̤̤̬̍g̸̢͕̹̥̦͓̭͈̮̩̥͇̱̿̈́͑̓͂̾͒̈́͌̇̅ͅơ̷̡̤͎͇̝̺͎̪͎̦͇̟͌̌͛̎̀̑̑͑̉͛͜o̴̧̺̰̍̆̈́͗̇͋̐͑̏̑͝d̶̢̧̨̝̞̖̲͇̫̰̭̬͕̈́͒͗̕͜ͅ ̸̤̟̩̝̼̮͓̪̞͔̇̅̀̀̄̚͘̚͠ȩ̸̡̺̲̤̩͈͉̼̍̋̽͂̀ͅñ̷̨̛̛̰̟̬̰͕̝̜͉̰̟͇̳̀̏̔̌̽̕͠͝ǫ̴̼͚̼̱͈͚̥̩̪̯͂̅͒͒̅ư̴̜̭͓̅͊̌̒̒͋g̶̳͇̐̊̚h̶̨̫͉̦̬͎͕͇̲͎͋͑͒̒̿̓";

export const createSpamNotification = (
  id: number,
  name: CONTACT_NAMES,
  message: string,
  backgroundColor?: string,
  delay?: number,
  conditions?: RouteConditionsType,
) => {
  const notification: EventBasedRouteType = {
    id: id,
    backgroundColor: backgroundColor,
    conditions: conditions,
    delay: delay || 500,
    exchanges: [
      {
        name: name,
        messages: [message],
      },
    ],
  };
  return notification;
};

export const createSpamAccount = () => {
  let SPAM = CONTACT_NAMES.SPAM4;
  const spam: ConversationType = {
    name: SPAM,
    tags: [SPAM],
    heroImage: getAvatarFromContacts(CONTACT_NAMES.SPAM4),
    interfaceColor: getColorFromContacts(CONTACT_NAMES.SPAM4)[0],
    eventBasedRoutes: [],
    exchanges: [],
    routes: [],
  };
  return spam;
};
