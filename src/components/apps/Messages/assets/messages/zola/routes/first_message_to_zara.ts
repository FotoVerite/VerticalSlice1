import {DigestedItemTypes} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ZARA_ROUTE_IDS} from './routes';

export enum ZARA_FIRST_MESSAGE_OPTIONS {
  A = 'Zara?',
}

export const first_message_to_zara: MessageRouteType = {
  id: ZARA_ROUTE_IDS.FIRST_MESSAGE_TO_ZARA,
  options: Object.values(ZARA_FIRST_MESSAGE_OPTIONS),
  routes: {
    [ZARA_FIRST_MESSAGE_OPTIONS.A]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: ['Zara?'],
      },
      {
        name: CONTACT_NAMES.ZOLA,
        messages: [
          "OMG, you're okay! It's been days",
          'You know I called the police!',
          "Where have you've been",
        ],
      },
      {
        name: CONTACT_NAMES.SELF,
        messages: ['No, Zara, sorry.', 'Its Michael'],
      },
      {
        name: CONTACT_NAMES.ZOLA,
        messages: [
          {
            type: DigestedItemTypes.STRING,
            message: 'Michael?...',
            typingDelay: 3000,
          },
          'WTF Michael',
        ],
      },
      {
        name: CONTACT_NAMES.SELF,
        messages: ['Yeah, I know this is fucked.'],
      },
      {
        name: CONTACT_NAMES.ZOLA,
        messages: ['Wait...', 'Why are you on his phone?'],
      },
      {
        name: CONTACT_NAMES.SELF,
        messages: [
          "It's been three days and we have zero answ",
          'I looked on find my phone and saw it was still in his apartment.',
        ],
      },
      {
        name: CONTACT_NAMES.ZOLA,
        messages: [
          "You're in his apartment!",
          'How?! he took his keys back from you, I know he did because I kicked his ass over a month to do it.',
        ],
      },
    ],
  },
};
