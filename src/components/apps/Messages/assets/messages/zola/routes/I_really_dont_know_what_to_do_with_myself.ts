import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ZARA_ROUTE_IDS} from './routes';

export enum ZARA_I_REALLY_DONT_KNOW_WHAT_TO_DO_WITH_MYSELF {
  A = "I really don't know what to do with myself",
  B = 'Maybe this a metaphor for my life',
  C = 'What if this is my life now.',
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
  id: ZARA_ROUTE_IDS.I_REALLY_DONT_KNOW_WHAT_TO_DO_WITH_MYSELF,
  options: Object.values(ZARA_I_REALLY_DONT_KNOW_WHAT_TO_DO_WITH_MYSELF),
  routes: {
    [ZARA_I_REALLY_DONT_KNOW_WHAT_TO_DO_WITH_MYSELF.A]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [ZARA_I_REALLY_DONT_KNOW_WHAT_TO_DO_WITH_MYSELF.A],
      },
      {
        name: CONTACT_NAMES.ZOLA,
        messages: ['In what way?', 'Like your bored without your shiny toys?'],
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
    [ZARA_I_REALL_DONT_KNOW_WHAT_TO_DO_WITH_MYSELF.B]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [ZARA_I_REALL_DONT_KNOW_WHAT_TO_DO_WITH_MYSELF.B],
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
    [ZARA_I_REALL_DONT_KNOW_WHAT_TO_DO_WITH_MYSELF.C]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [ZARA_I_REALL_DONT_KNOW_WHAT_TO_DO_WITH_MYSELF.C],
      },
    ].concat(exchanges),
  },
};
