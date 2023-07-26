import {
  ExchangeBlockType,
  MessageRouteType,
} from 'components/apps/Messages/context/types';
import {
  CONTACT_NAMES,
  getAvatarFromContacts,
} from 'components/apps/Messages/context/usersMapping';
import {DigestedItemTypes} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {MICHAEL_IDS} from './routes';

export enum MICHAEL_ABOUT_TONIGHT_REPLY_OPTIONS {
  A = '😈',
  B = 'BLAH',
}

const OPTIONS = MICHAEL_ABOUT_TONIGHT_REPLY_OPTIONS;
const MICHAEL = CONTACT_NAMES.MICHAEL;
const SELF = CONTACT_NAMES.SELF;

const exchanges: ExchangeBlockType[] = [
  {
    name: MICHAEL,
    messages: [
      'You set up your new phone yet?',
      'Want to try out that Camera. 😀',
    ],
  },
  {
    name: SELF,
    messages: ['Someone’s very hot to trot'],
  },
  {
    name: MICHAEL,
    messages: [
      'Hot to trot. Who uses that?',
      "Yes, sir you’re the bee's knees and just the ginchiest",
    ],
  },
  {
    name: SELF,
    messages: ['I believe you, if I could send history.'],
  },
  {
    name: MICHAEL,
    messages: [
      'Only when I’m drunk and quoting my father…',
      'Wait why can’t you send history',
    ],
  },
  {
    name: SELF,
    messages: [
      'Contacts are borked. This reads as Maybe Michael',
      {
        type: DigestedItemTypes.SNAPSHOT,
        message: {
          filename: 'MICHAEL_SNAPSHOT',
          backup: getAvatarFromContacts(MICHAEL),
        },
      },
    ],
  },
  {
    name: MICHAEL,
    messages: [
      "UGh, that's my default profile portrait?",
      'Well that sucks, any ideas if/when it can be fixed.',
    ],
  },
  {
    name: SELF,
    messages: ['Hopefully a few hours.'],
  },
  {
    name: MICHAEL,
    messages: [
      'Well since you’re cut-off from the world might as make yourself useful.',
      'Now take off your shirt and send me something to get me revved up for later',
    ],
  },
  {
    name: SELF,
    messages: ['In a bit.', 'Kinda need to psych myself up'],
  },
  {
    name: MICHAEL,
    messages: ['You look great. The new routine is really working for you.'],
  },
  {
    name: SELF,
    messages: ['Suuure'],
  },
];

export const michael_about_tonight_reply: MessageRouteType = {
  id: MICHAEL_IDS.ABOUT_TONIGHT_REPLY,
  options: Object.values(OPTIONS),
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [{type: DigestedItemTypes.EMOJI, message: '😈'}],
      },
    ].concat(exchanges),
    [OPTIONS.B]: [
      {
        name: SELF,
        messages: [OPTIONS.B],
      },
    ].concat(exchanges),
  },
};
