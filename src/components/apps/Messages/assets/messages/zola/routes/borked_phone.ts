import {MESSAGE_TYPE} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ZARA_ROUTE_IDS} from './routes';

export enum BORKED_PHONE_OPTIONS {
  A = 'So, guess who borked his main way of communicating with the world',
}

export const borked_phone: MessageRouteType = {
  id: ZARA_ROUTE_IDS.BORKED_PHONE,
  options: Object.values(BORKED_PHONE_OPTIONS),
  routes: {
    [BORKED_PHONE_OPTIONS.A]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [
          'So, guess who borked his main way of communicating with the world',
        ],
      },
      {
        name: CONTACT_NAMES.ZOLA,
        messages: ['Obviously not you, since you’re talking to me right now. '],
      },
      {
        name: CONTACT_NAMES.SELF,
        messages: [
          'Yeaaaah, I kinda sorta, bricked my account and lost all my contacts.',
        ],
      },
      // {
      //   name: CONTACT_NAMES.ZOLA,
      //   messages: ['No, really, how?'],
      // },
      // {
      //   name: CONTACT_NAMES.SELF,
      //   messages: [
      //     'Unsure, I think my keychain was using a stale password and I just kept trying to enter it till it locked me out for the next…',
      //     '5 hours I think.',
      //   ],
      // },
      // {
      //   name: CONTACT_NAMES.ZOLA,
      //   messages: ['What will you do with yourself?'],
      // },
      // {
      //   name: CONTACT_NAMES.SELF,
      //   messages: ['Probably kill myself.'],
      // },
      // {
      //   name: CONTACT_NAMES.ZOLA,
      //   messages: [{type: MESSAGE_TYPE.EMOJI, message: '😦'}],
      // },
      // {
      //   name: CONTACT_NAMES.SELF,
      //   messages: [
      //     'I’m trying to find some of my contacts in the meantime, but I was overzealous with inbox zero.',
      //   ],
      // },

      // {
      //   name: CONTACT_NAMES.ZOLA,
      //   messages: ['Inbox what?'],
      // },
      // {
      //   name: CONTACT_NAMES.SELF,
      //   messages: ['I deleted nearly all my emails instead of archiving.'],
      // },
      // {
      //   name: CONTACT_NAMES.ZOLA,
      //   messages: ['That sounds like an amazing system'],
      // },
    ],
  },
};
