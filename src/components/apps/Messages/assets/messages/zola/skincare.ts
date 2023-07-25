import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ConversationExchangeType} from '../../../context/types';
import {DigestedItemTypes} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

export const skincare: ConversationExchangeType = {
  time: '2021-06-21T14:00:00Z',
  exchanges: [
    {
      name: CONTACT_NAMES.ZOLA,
      messages: [
        "Well you know me, enthusiastic to a fault. And you know I'm just dying to get some eye shadow on those deep-set eyes of yours",
      ],
    },
    {
      name: CONTACT_NAMES.SELF,
      messages: [
        'Deep-set, Thanks. 🙃',
        "And no makeup, you know I'm not that faggy right. I wouldn't know a makeup brush from a hair brush. I just need a bit of help with my skin. Matt remarked about it",
      ],
    },
    {
      name: CONTACT_NAMES.ZOLA,
      messages: [
        "With how you wear your hair I don't doubt that.",
        "And Matt thinks you very cute you're overreacting",
      ],
    },
    {
      name: CONTACT_NAMES.SELF,
      messages: [
        {
          type: DigestedItemTypes.STRING,
          message: "I know I'm cute. God damn spend enough time at the gym.",
          reaction: {name: 'heart', color: '#f487d3'},
        },
      ],
    },
    {
      name: CONTACT_NAMES.ZOLA,
      messages: [
        {
          type: DigestedItemTypes.STRING,
          message:
            "Well your confidence is intact. The gym is no place to train one's skin though",
          reaction: {name: 'thumbs-down', color: '#c22036'},
        },
      ],
    },
    {
      name: CONTACT_NAMES.SELF,
      messages: ['🙃💁‍♀️', 'Are you done.'],
    },
    {
      name: CONTACT_NAMES.ZOLA,
      messages: [
        "No, I've been waiting for years for you to finally take care of yourself. I've think I've gotten a million subscribers while waiting for you to even listen to me to wear sunscreen.",
      ],
    },
    {
      name: CONTACT_NAMES.SELF,
      messages: ["I know, I know, you're best friend is your sunscreen"],
    },
    {
      name: CONTACT_NAMES.ZOLA,
      messages: ["It's SPF is your BFF. Do you even watch my videos?"],
    },
    {
      name: CONTACT_NAMES.SELF,
      messages: ['You post one every day girl.'],
    },
    {
      name: CONTACT_NAMES.ZOLA,
      messages: ["I know, I'm a slave to the algorithm."],
    },
  ],
};
