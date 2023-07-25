import {ConversationType} from 'components/apps/Messages/context/types';
import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

export const grace_russo: ConversationType = {
  name: CONTACT_NAMES.GRACE_RUSSO,
  tags: ['sleep', 'government', 'midlife crises', 'astrology'],
  date: 'August 14th, 2022',
  listContent:
    "If someone wouldn't recognize you on the street. You aren't doing yourself any favors.",
  heroImage: getAvatarFromContacts(CONTACT_NAMES.GRACE_RUSSO),
  interfaceColor: getColorFromContacts(CONTACT_NAMES.GRACE_RUSSO)[0],
  exchanges: [
    {
      time: '2021-08-14T20:04:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.GRACE_RUSSO,
          messages: [
            "Why is half my life/job convincing people that the red tape the government wants is unneeded. The CIA doesn't need fips 140, they use fucking amazon. But here I am spending my lunch hour convincing my team that it makes no sense to backport their services.",
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "I mean... that's been your life since you sold your soul",
          ],
        },
        {
          name: CONTACT_NAMES.GRACE_RUSSO,
          messages: ['You know my soul is worth way more then they pay me.'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'I know gurl. 💅',
            "I've been feeling kinda aimless these days",
          ],
        },
      ],
    },
    {
      time: '2021-08-14T20:24:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.GRACE_RUSSO,
          messages: ['What do you mean?'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ["I'm turning 40 Grace."],
        },
        {
          name: CONTACT_NAMES.GRACE_RUSSO,
          messages: ['When?'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "Nov, how many times do I need to remind you that I'm a ♐️",
          ],
        },
        {
          name: CONTACT_NAMES.GRACE_RUSSO,
          messages: ["I'm a atheist"],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Good for you?'],
        },
        {
          name: CONTACT_NAMES.GRACE_RUSSO,
          messages: ['Astrology has become a gay religion.'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ["I can't even.", '🫠🫠🫠'],
        },
        {
          name: CONTACT_NAMES.GRACE_RUSSO,
          messages: ['Why are you feeling this way?'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'I don\'t know, I really don\'t. I just wake up sometimes and think. "Am I there? Is this what I really wanted."',
          ],
        },
        {
          name: CONTACT_NAMES.GRACE_RUSSO,
          messages: [
            "We just have less milestones then we used to. If we wanted kids we would be using them to measure our lives. But we don't, so we need other rulers, other goals. Mine is to find my way to a nice beach and get day drunk and a tan by the end of this month.",
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['So much sand in my ass. I never liked the 🏖︎'],
        },
        {
          name: CONTACT_NAMES.GRACE_RUSSO,
          messages: ["I wasn't inviting you. 🤣"],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "I just... I don't know what I want. I never did. And I thought I wanted Matt, maybe I still do. I'm all twisted. I've been twisted for months and I just... I look at my screen and don't even understand the paragraphs I write half the time. I zone out, do my job and  remember nothing of consequence.",
          ],
        },
        {
          name: CONTACT_NAMES.GRACE_RUSSO,
          messages: [
            "Maybe you're just just burnt out. When did you last take a day off.",
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Yesterday. I treat myself well.'],
        },
      ],
    },
    {
      time: '2021-08-14T22:50:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.SELF,
          messages: ["I also can't seem to sleep."],
        },
      ],
    },
    {
      time: '2021-10-12T23:23:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Girl that photo!'],
        },
        {
          name: CONTACT_NAMES.GRACE_RUSSO,
          messages: ['Huh?'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "Don't huh me. For the podcast you were just on.",
            'I mean the outfit like your book is 🔥',
            'But girl how many levels of photoshop did they do. Five, six?',
          ],
        },
        {
          name: CONTACT_NAMES.GRACE_RUSSO,
          messages: ["And you wonder why you're single"],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "Oh don't even. They took off thirty pounds and gave you the skin of a twenty something",
            'Though love love love the hair you should do tha style more.',
          ],
        },
        {
          name: CONTACT_NAMES.GRACE_RUSSO,
          messages: ['Maybe I am a twenty something in the photo'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "Well you're 35 now so I would call that false advertising",
          ],
        },
        {
          name: CONTACT_NAMES.GRACE_RUSSO,
          messages: [
            "It's a podcast about optimization of old banking system not a dating website.",
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "If someone wouldn't recognize you on the street. You aren't doing yourself any favors.",
          ],
        },
      ],
    },
  ],
};
