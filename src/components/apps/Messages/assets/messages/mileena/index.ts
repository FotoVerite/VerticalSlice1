import {DigestedItemTypes} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {ConversationType} from 'components/apps/Messages/context/types';
import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

export const mileena: ConversationType = {
  name: CONTACT_NAMES.MILEENA,
  tags: [],
  heroImage: getAvatarFromContacts(CONTACT_NAMES.MILEENA),
  interfaceColor: getColorFromContacts(CONTACT_NAMES.MILEENA)[0],
  exchanges: [
    {
      time: '2019-05-27T17:34:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.MILEENA,
          messages: ["You're coming to my show right?"],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Have I missed one yet?'],
        },
        {
          name: CONTACT_NAMES.MILEENA,
          messages: ['Just trying to keep it that way'],
        },
      ],
    },
    {
      time: '2019-05-28T04:24:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.MILEENA,
          messages: [
            'Yooo... who was that cutie that you were macking on after my set?',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['After?'],
        },
        {
          name: CONTACT_NAMES.MILEENA,
          messages: [
            "Boy don't play",
            'Do you want me to come after you for missing half of my songs?',
            'I saw you making googoo eyes the moment you got into the bar.',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'Googoo eyes... Yes, he is the Bees Knees. Simply berries',
          ],
        },
        {
          name: CONTACT_NAMES.MILEENA,
          messages: ['So'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "You waiting for a fuck play by play? Gurl I know you like to go deep with your escapade but that's not me",
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ["C'mon nothing"],
        },
        {
          name: CONTACT_NAMES.MILEENA,
          messages: ['That double entendre is shit and you know it.'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "Look he's sleeping next to me and I'm trying to get enough rest for a round two before eggs. ",
          ],
        },
        {
          name: CONTACT_NAMES.MILEENA,
          messages: ['Name at least?'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Greg'],
        },
      ],
    },
    {
      time: '2019-06-05T23:29:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "You're cousin is so cute",
            'Seeing him do downward dog almost warms my cold selfish heart enough to want kids',
          ],
        },
        {
          name: CONTACT_NAMES.MILEENA,
          messages: [
            'I know, I love him so much.',
            'I wish I could see him more but work, band, life.',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'You get up to Beantown a good amount.',
            'I really need to go with you sometime I need me some good seafood.',
          ],
        },
        {
          name: CONTACT_NAMES.MILEENA,
          messages: ["I don't know if you can hang with my folks"],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Mmm is it the gay or the white'],
        },
        {
          name: CONTACT_NAMES.MILEENA,
          messages: [
            'Neither',
            'How much twitter you reading to ask such a fucking dumb question',
            'My parents having issues with gay people, white people',
            'The sheer caucasity',
            "You couldn't keep up with my dad he does 30 miles a day on his bike.",
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'Okay, point taken',
            "You don't talk about them that much you know. Mostly your brothers",
            'And I do remember you not wanting to talk about your girlfriend back in college',
          ],
        },
        {
          name: CONTACT_NAMES.MILEENA,
          messages: ['Ten years ago'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'Yeah back when you literally thought dicks were over a foot long',
            "What was it you asked? How do they not hit the seat when they're pissing",
          ],
        },
        {
          name: CONTACT_NAMES.MILEENA,
          messages: ['Six inches.', 'Sheltered Boarding School Girl'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Sheltered European Boarding School Girl'],
        },
        {
          name: CONTACT_NAMES.MILEENA,
          messages: ['Yeah yeah, but Imma a fast tailed girl now.'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'How many times do I need to apologize for using that slang',
          ],
        },
        {
          name: CONTACT_NAMES.MILEENA,
          messages: [
            'Forever, I think I heard three other black people actually use that term without making fun of it. Where did you even hear it some low grade blog post on huffington',
            'Be like one of the black israelites calling me red bone. Just fucking corny',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'I think probably Salon. Back before Greenwald was a right wing cuck.',
          ],
        },
      ],
    },
    {
      time: '2019-07-02T15:21:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.MILEENA,
          messages: ['You want to come to the 🏖️'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ["I don't like sand"],
        },
        {
          name: CONTACT_NAMES.MILEENA,
          messages: [
            "But you like sun, and I know you've been wanting to show off those guns you've been working on all winter.",
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'It’s coarse, and rough, and irritating, and it gets everywhere',
          ],
        },
        {
          name: CONTACT_NAMES.MILEENA,
          messages: [
            'Yes, we get it you hate sand. Why are you sounding like a whiney bitch of all a sudden',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [{type: DigestedItemTypes.EMOJI, message: '🥲'}],
        },
      ],
    },
  ],
};
