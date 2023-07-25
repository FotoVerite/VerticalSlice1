import {ConversationType} from 'components/apps/Messages/context/types';
import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';

export const movieNight: ConversationType = {
  name: CONTACT_NAMES.MOVIE_NIGHT,
  tags: ['Seamless', 'order', 'food', 'hungry', 'grubhub'],
  heroImage: getAvatarFromContacts(CONTACT_NAMES.MOVIE_NIGHT),
  interfaceColor: getColorFromContacts(CONTACT_NAMES.MOVIE_NIGHT)[0],
  group: true,
  exchanges: [
    {
      time: '2021-02-10T17:02:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.ARIAL,
          messages: ["Can't make it this time."],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['I wish you could'],
        },
        {
          name: CONTACT_NAMES.ARIAL,
          messages: ['I Know.'],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: [
            'I miss you girl. You at least have time for a wine hang soonish?',
          ],
        },
        {
          name: CONTACT_NAMES.ARIAL,
          messages: ['Hopefully. Everything has me feeling a bit ground down.'],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['O, the new Ben Whetly movie is streaming.'],
        },
      ],
    },
    {
      time: '2021-04-16T17:04:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['O, the new Ben Whetly movie is streaming'],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: ['In the Earth? Looks a bit like an ecological cult movie'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "There's only seven actors on IMDB. It was shot at the hight of the Pandemic. I really doubt they could do a good cult movie",
          ],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ["You don't need that many people for a cult"],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['I need something old school'],
        },
      ],
    },
    {
      time: '2021-05-25T15:32:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.ARIAL,
          messages: ["I can't make it this time either."],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: ["I can't also"],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ["I'm still in"],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Going to just be the two of us then'],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: [
            'Good, only you could deal with Beyond the Black Rainbow.',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Yes, I am a masochists'],
        },
      ],
    },
    {
      time: '2021-08-25T15:52:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.ZOLA,
          messages: ["It's time toooo movie night!"],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: [
            'Is this where we draw a smiley face on or hands and do a group huddle before we are sent to the shadow zone.',
          ],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: ['It is a symbol of friendship'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Weeeeeb'],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: ["Seriously, I'm bored and climbing the walls"],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['Sounds like a normal Saturday night for you'],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: [
            'No, normally I have more 🍷. And actual witty repertoire to keep me amused',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'Sorry, work has kept me busy gurl.',
            'That and setting up the new office.',
          ],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: [
            "You need to send photos of that soon. I'm pretty sure you haven't event started to decorate it properly",
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['At least I cabled managed'],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['I want to see a new horror film'],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: [
            "It's always horror with you. We've done six of them in a row",
          ],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['We have not!'],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: [
            'In the Earth.',
            'A Field in England.',
            'Susperia Both Versions',
            'A Dark Song',
          ],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['I count only five'],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: ['The Tenet'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Point'],
        },
        {
          name: CONTACT_NAMES.ARIAL,
          messages: ['I actually might have time this month'],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['Clair letting you out for the night'],
        },
        {
          name: CONTACT_NAMES.ARIAL,
          messages: ["She ain't my keeper!"],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: [
            "Is that why you've only made it twice in the last six months",
          ],
        },
        {
          name: CONTACT_NAMES.ARIAL,
          messages: ["I've been busy."],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['With Clair'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Chris lay the fuck off'],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ["I'm just saying the obvious. 💁‍♀️"],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Why did I ever show you that emoji'],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: ['Zoolander?'],
        },
      ],
    },
  ],
};
