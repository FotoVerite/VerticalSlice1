import chrisAvatar from '@apps/Messages/assets/avatars/Chris.jpg';
import {ConversationType} from 'components/apps/Messages/context/types';
import {
  CONTACT_NAMES,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

export const clay: ConversationType = {
  name: CONTACT_NAMES.CLAY,
  tags: [],
  date: 'December 22th, 2022',
  listContent: 'Meet any interesting people?',
  heroImage: chrisAvatar,
  interfaceColor: getColorFromContacts(CONTACT_NAMES.CLAY)[0],
  exchanges: [
    {
      time: '2020-12-14T20:04:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.SELF,
          messages: [`Happy Birthday Dude, been a while`],
        },
        {
          name: CONTACT_NAMES.CLAY,
          messages: ['Thanks'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'I miss you being around. Not the same without you in the city.',
          ],
        },
        {
          name: CONTACT_NAMES.CLAY,
          messages: [
            "I'm going to visiting. I have couches I can crash on. But it's RV life for me for the moment. NY and even SF are suffocating. I wasn't feeling like myself anymore.",
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'I also wanted to apologize for what I said last time we talked',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [`${CONTACT_NAMES.CLAY}?`],
        },
      ],
    },
    {
      time: '2020-12-14T20:50:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.CLAY,
          messages: ["About how I'm a slut?"],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'No, you are a slut. But I also called you selfish and you got a right to be pissed off over that.',
          ],
        },
        {
          name: CONTACT_NAMES.CLAY,
          messages: ["...maybe I'm am"],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'It was easier to feel that way when I was with someone before the breakup.',
          ],
        },
        {
          name: CONTACT_NAMES.CLAY,
          messages: ['And now you remember how dating actually goes.'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ["It's way worse be honest."],
        },
        {
          name: CONTACT_NAMES.CLAY,
          messages: ['Are you actually dating?'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "Depends on the defin no, I'm just fucking around and being dumb.",
          ],
        },
        {
          name: CONTACT_NAMES.CLAY,
          messages: ['Dumb like me?'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "No, but I get it at least. These boys are exhausitng. You are still being too risky. PREP doesn't solve everything. There are other things out there besides HIV.",
          ],
        },
        {
          name: CONTACT_NAMES.CLAY,
          messages: [
            'And there are drugs to cure them',
            "Did you txt to apologize or just sermonize to me yet again on how I'm a bad faggot.",
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ["You know there's something called super gonorrhea"],
        },
        {
          name: CONTACT_NAMES.CLAY,
          messages: ['My body my choice boo.'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Yeah'],
        },
      ],
    },
    {
      time: '2020-12-14T21:02:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.CLAY,
          messages: ['How many notches did you add in the last month'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Five'],
        },
        {
          name: CONTACT_NAMES.CLAY,
          messages: ['Definitely not the only slut here anymore'],
        },
      ],
    },
    {
      time: '2020-12-22T23:05:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.SELF,
          messages: ['How goes the Van Life?'],
        },
        {
          name: CONTACT_NAMES.CLAY,
          messages: [
            'Well, parked outside of Phoenix for the moment. Might head back to Cali to do Joshua for a few weeks.',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Meet any interesting people?'],
        },
      ],
    },
  ],
};
