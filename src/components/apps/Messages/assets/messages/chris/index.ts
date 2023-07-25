import chrisAvatar from '@apps/Messages/assets/avatars/Chris.jpg';
import coil from '@apps/Messages/assets/messages/chris/coil.jpeg';
import {DigestedItemTypes} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

import {ConversationType} from 'components/apps/Messages/context/types';
import {
  CONTACT_NAMES,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';
import {chris_test_route} from './routes/test_route';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

export const chris: ConversationType = {
  name: CONTACT_NAMES.CHRIS,
  tags: [],
  routes: [],
  heroImage: chrisAvatar,
  interfaceColor: getColorFromContacts(CONTACT_NAMES.CHRIS)[0],
  exchanges: [
    {
      time: '2021-10-28T15:00:04Z',
      exchanges: [
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['What about Hellraiser?'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ["That's a good one. I don't think Zara seen it before."],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['Why do you care so much about her?'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "Cause she's the scardy cat of the group. And it's no fun if nobody screams at the gruesome parts.",
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            {
              type: DigestedItemTypes.STRING,
              message: 'Funny thing about Hellraiser.',
            },
            {type: DigestedItemTypes.IMAGE, message: coil},
          ],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: [
            'Here we go. Okay',
            "I'll humor you what does Coil have to do with bloody Hellraiser.",
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'So Clive Barker actually was friends with Stephen Thrower',
          ],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['Who is?...............', '8=================D'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Oh my god dude, grow up.'],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: [
            "You're the one sending album covers covered in dick and balls",
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'One dick and balls',
            'Anyway Stephen Thrower was one of the members of Coil',
          ],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['Like the synth guy or'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "They didn't work like that. They were all very collaborative, AND YOU'RE TRYING TO SIDETRACK ME!!!",
          ],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: [
            {type: DigestedItemTypes.STRING, message: 'Guilty'},
            {type: DigestedItemTypes.EMOJI, message: '😈'},
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'So, Stephen Tower was friends with Barker and decided to introduce him to them. He vibed with the sound and contracted them to make the soundtrack for Hellraiser.',
          ],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: [
            'Coil did not do the soundtrack, that was Christopher Young',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'Yes, the studio wanted something more commercial. You can find their version online as the Unreleased Themes for Hellraiser',
          ],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['Interesting'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'Stephen was also really interested in Body Modification. Had lots of Magazines he showed Barker. Probably had a lot of influence on how the Cenobites developed visually.',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'I think you are underestimating the world building he did in the Hell Bound Heart',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'They were friends when he was writing it. This was 1985.',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ["When do you think we'll first hear Zola scream?"],
        },
      ],
    },
    {
      time: '2021-11-12T16:12:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['Motherfucker, last week has been grueling'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ["You're the one who chose to work at Google."],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['What can I say I like money'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Was it wart it?'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Worth it?'],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['Yes', '💰💰💰'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Okay Faust'],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['Who?'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Faust? Goethe Faust? Made a deal with the devil.'],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['Like the devil went down to George?'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [{type: 'emoji', message: '🙁'}],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: [
            "I'm sorry that my low brow STEM masters of science does not have all these references.",
            'Also I have time tomorrow if you want to come over?',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Just watch something? 😈'],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ["I mean... I've been thinking about this."],
        },
      ],
    },
    {
      time: '2021-11-15T21:12:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['Are you going to be weird about last night?'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "Only if you are? I mean it's on me. I know that. I'm the responsible one of the group and here I am still shitfaced 3pm the next day",
          ],
        },
      ],
    },
    {
      time: '2022-06-15T10:20:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['You should come with us to the Liberation march.'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ["It's not my scene you know that. Never was."],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['I could use the support you know.'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "Dude, don't put that on me. And I have been supportive. You know that.",
          ],
        },
        {
          name: CONTACT_NAMES.CHRIS,
          messages: ['Have you?'],
        },
      ],
    },
  ],
};
