import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ZARA_ROUTE_IDS} from './routes';

export enum ZARA_CAN_YOU_PLEASE_HELP_ME_OPTIONS {
  A = "Zara, all I want to do is find out where he is and make sure he's safe.",
  B = 'OMG why did I even bother',
  C = "Please there's no clues in the apartment. I'm just scared something really bad happened",
}

const exchanges = [
  {
    name: CONTACT_NAMES.ZOLA,
    messages: [
      "I'm not the one who broke into my ex's place and hacked his phone",
    ],
  },
  {
    name: CONTACT_NAMES.SELF,
    messages: ["I didn't hack his phone. He never changed his passwords"],
  },
  {
    name: CONTACT_NAMES.ZOLA,
    messages: [
      'Really... REALLY! OMG and he always talks about security.',
      'Okay fine..., you found anything out?',
    ],
  },
];

export const can_you_please_help_me: MessageRouteType = {
  id: ZARA_ROUTE_IDS.CAN_YOU_PLEASE_HELP_ME_HELP_HIM,
  options: Object.values(ZARA_CAN_YOU_PLEASE_HELP_ME_OPTIONS),
  routes: {
    [ZARA_CAN_YOU_PLEASE_HELP_ME_OPTIONS.A]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [ZARA_CAN_YOU_PLEASE_HELP_ME_OPTIONS.A],
      },
      {
        name: CONTACT_NAMES.ZOLA,
        messages: [
          "Well obviously he isn't",
          'When was the last time you even talked to him',
        ],
      },
      {
        name: CONTACT_NAMES.SELF,
        messages: ['Um...', 'two years ago'],
      },
      {
        name: CONTACT_NAMES.ZOLA,
        messages: ['As I said fucking creepy your there'],
      },
      {
        name: CONTACT_NAMES.SELF,
        messages: ['He froze me out'],
      },
    ].concat(exchanges),
    [ZARA_CAN_YOU_PLEASE_HELP_ME_OPTIONS.B]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [ZARA_CAN_YOU_PLEASE_HELP_ME_OPTIONS.B],
      },
      {
        name: CONTACT_NAMES.ZOLA,
        messages: ['Why did you?'],
      },
      {
        name: CONTACT_NAMES.SELF,
        messages: [
          'Because I still care, as stupid as that sounds. And when Mileena told me he was missing',
        ],
      },
      {
        name: CONTACT_NAMES.ZOLA,
        messages: ["Wait that's how you know?"],
      },
      {
        name: CONTACT_NAMES.SELF,
        messages: [
          'Yeah, she told me last night after it had been around 48 hours since you reported him missing.',
          '2 days.',
          'So sorry for caring',
        ],
      },
    ].concat(exchanges),
    [ZARA_CAN_YOU_PLEASE_HELP_ME_OPTIONS.C]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [ZARA_CAN_YOU_PLEASE_HELP_ME_OPTIONS.C],
      },
    ].concat(exchanges),
  },
};
