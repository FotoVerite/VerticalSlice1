import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ZARA_ROUTE_IDS} from './routes';

export enum ZARA_WHY_ARE_YOU_IN_HIS_APARTMENT_OPTIONS {
  A = 'Zara re-litigating the relationship is not a good use of time.',
  B = 'Is that the important part?',
  C = 'I got the doorman to let me in.',
}

const exchanges = [
  {
    name: CONTACT_NAMES.SELF,
    messages: [
      'I assumed',
      "I would have asked if you hadn't blocked me",
      'But I wanted to see for myself and see if I could get into his computer or phone',
    ],
  },
  {
    name: CONTACT_NAMES.ZOLA,
    messages: ['That sounds so fucking creepy'],
  },
];

export const why_are_you_in_his_apartment: MessageRouteType = {
  id: ZARA_ROUTE_IDS.WHY_ARE_YOU_IN_HIS_APARTMENT,
  options: Object.values(ZARA_WHY_ARE_YOU_IN_HIS_APARTMENT_OPTIONS),
  routes: {
    [ZARA_WHY_ARE_YOU_IN_HIS_APARTMENT_OPTIONS.A]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [
          ZARA_WHY_ARE_YOU_IN_HIS_APARTMENT_OPTIONS.A,
          'Rick let me in.',
        ],
      },
      {
        name: CONTACT_NAMES.ZOLA,
        messages: [
          "I'm so getting Rick fired.",
          'Never going to trust him again.',
          'You know I already checked his place yesterday.',
        ],
      },
    ].concat(exchanges),
    [ZARA_WHY_ARE_YOU_IN_HIS_APARTMENT_OPTIONS.B]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [
          ZARA_WHY_ARE_YOU_IN_HIS_APARTMENT_OPTIONS.B,
          'My EX, your best friend has been missing for 3 fucking days and you care about a bit of B&E',
          'Rick let me in.',
        ],
      },
      {
        name: CONTACT_NAMES.ZOLA,
        messages: [
          "I'm so getting Rick fired.",
          'Never going to trust him again.',
          'You know I already checked his place yesterday.',
        ],
      },
    ].concat(exchanges),
    [ZARA_WHY_ARE_YOU_IN_HIS_APARTMENT_OPTIONS.C]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [ZARA_WHY_ARE_YOU_IN_HIS_APARTMENT_OPTIONS.C],
      },
      {
        name: CONTACT_NAMES.ZOLA,
        messages: ["I'm so getting Rick fired."],
      },
      {
        name: CONTACT_NAMES.SELF,
        messages: ['How do you know its Rick'],
      },
      {
        name: CONTACT_NAMES.ZOLA,
        messages: ["Cause it's always Rick"],
      },
      {
        name: CONTACT_NAMES.ZOLA,
        messages: ['You know I already checked his place yesterday.'],
      },
    ].concat(exchanges),
  },
};
