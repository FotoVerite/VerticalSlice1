import {ConversationType} from 'components/apps/Messages/context/types';
import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

import hammerSickle from '@apps/Messages/assets/messages/steve_litt/hammer_sickle.jpeg';
import fist from '@apps/Messages/assets/messages/steve_litt/fist.png';

export const steveLitt: ConversationType = {
  name: CONTACT_NAMES.STEVE_LITT,
  tags: ['communism, moa, stalin, trust-fund, jobs'],
  date: 'June 28th, 2022',
  listContent: 'How about some K then',
  heroImage: getAvatarFromContacts(CONTACT_NAMES.STEVE_LITT),
  interfaceColor: getColorFromContacts(CONTACT_NAMES.STEVE_LITT)[0],
  exchanges: [
    {
      time: '2021-10-11T17:32:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: ['So if I say Fairlight does that mean anything to you?'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'Peter Gabriel, Kate Bush, Coil, There were a few serries produced. Why?',
          ],
        },
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: [
            "Ape it's ux to give some authenticity to the sampling app.",
            'Do zoomers even care about authenticity of ux.',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ["That's begging the question"],
        },
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: [
            "Because zoomers don't care about authenticity like millennials?",
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ["Because it's a fucking stupid question to begin with."],
        },
      ],
    },
    {
      time: '2022-05-01T23:55:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: ['Do I have to go back to work tomorrow?'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Do you?'],
        },
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: [
            'I mean if I want to get paid. But do I need to get paid is the question.',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "Not with your trust-fund. Honestly dude I'm surprised you've made it half a year",
          ],
        },
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: [
            'Well the synth is interesting tech.',
            'And ye of little faith',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "Mhmm... I've helped write your resume",
            'How about you just stop complaining and bring some treats over while you talk about the latest thoughts on "On Contradiction"',
          ],
        },
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: ["You know I haven't read Mao in years. I moved on man"],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ["and you still haven't read Das Kapital"],
        },
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: [
            "One doesn't need to read all the foundational texts to put communism into praxis",
            'I mean you hated that book back in college, why should I bother when there are so many more interesting takes',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Yes I know, the DSA is doing such a great job.'],
        },
      ],
    },
    {
      time: '2022-06-28T22:22:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: [
            'I watched the sarah z video on idiocracy last night, I feel like she missed that mike judge isn’t a progressive',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "I don't know if Judge would agree with this statement",
            "He's just not the progressive you want",
          ],
        },
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: [
            'well like, the premise of the movie is a really old conservative trope and it felt like she wasn’t familiar with it like “eugenics!”',
            'obviously but it wasn’t lifted from the turn of the century',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'I don’t feel Mike judge believes in white replacement theory',
          ],
        },
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: [
            'of course not',
            'just because it’s a trope doesn’t mean he took it seriously',
            'but he wasn’t taking the piss either, something more interesting is going on',
            "it's actually made me think of the second abby thorne on jordan peterson",
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'I mean the basics of it are true',
            'Lower education has less access to contraception hence more kids',
            'Plus less training with impulse control',
            'Also the right/cults prerogative is to breed more bodies',
          ],
        },
      ],
    },

    {
      time: '2022-10-28T20:32:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: [
            'You know, you should celebrate your fortieth with a tattoo.',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['A tattoo', 'Reaaaally'],
        },
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: [
            {
              type: 'string',
              message:
                'I might be out of practice but I can still do some nice flash work. And you know this would be a great piece.',
            },
            {type: 'image', message: hammerSickle},
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "Not the MLM symbol I'd be gunning for.",
            "Dude, this is really something I don't want to think about right now.",
          ],
        },
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: ["It's in two weeks!"],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['I know', "Again, I don't want to think about it"],
        },
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: [
            {
              type: 'string',
              message: 'What about this one?',
            },
            {type: 'image', message: fist},
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'Once again, not really in my hanky code vernacular.',
            "You know I'm not one of your DSA scrubs dude, I'm not going to decorate my body with this shit.",
          ],
        },
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: ["Harsh, You've admitted before you want single payer"],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Single payer, not anarchy in the streets'],
        },
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: ['But what about the sheets'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "OMFG Steve what do you really want. Cause I don't want to trade barbs about Burkina Faso",
          ],
        },
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: ["You can't even name the leader"],
        },

        {
          name: CONTACT_NAMES.SELF,
          messages: ['Thomas Sankara'],
        },
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: ['You looked that up'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "Stop acting like a hyperactive puppy. I don't need to be cheered up.",
            "I get it I do, just pleas don't",
          ],
        },
        {
          name: CONTACT_NAMES.STEVE_LITT,
          messages: ['How about some K then'],
        },
      ],
    },
  ],
};
