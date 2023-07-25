import aliceAvatar from '@apps/Messages/assets/avatars/alice_avator.jpg';
import metroidDread from '@apps/Messages/assets/messages/alice/MetroidDread.jpeg';
import {DigestedItemTypes} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {ConversationType} from 'components/apps/Messages/context/types';
import {
  CONTACT_NAMES,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

export const alice: ConversationType = {
  name: CONTACT_NAMES.ALICE,
  tags: ['sleep', 'games', 'metroid'],
  heroImage: aliceAvatar,
  interfaceColor: getColorFromContacts(CONTACT_NAMES.ALICE)[0],
  exchanges: [
    {
      time: '2022-08-14T19:00:04Z',
      exchanges: [
        {
          name: CONTACT_NAMES.ALICE,
          messages: [
            {type: DigestedItemTypes.STRING, message: `And done!`},
            {type: DigestedItemTypes.IMAGE, message: metroidDread},
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Nice, how long did it take you'],
        },
        {
          name: CONTACT_NAMES.ALICE,
          messages: ['Eight and change'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['You going to try hard mode?'],
        },
        {
          name: CONTACT_NAMES.ALICE,
          messages: ['Fuck no, I got other games to play'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ["I'm still at the boss that controls the Lava Machine"],
        },
        {
          name: CONTACT_NAMES.ALICE,
          messages: ["I'm sorry I've been distant. A lot of my mind."],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ["We talked about that last week. It's okay"],
        },
        {
          name: CONTACT_NAMES.ALICE,
          messages: [
            'I know, but you were going through a lot and I just kinda let our friendship slide. ',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "Nobody can save you but yourself. I have my therapist. My issues shouldn't be dumped on my friends like that",
          ],
        },
        {
          name: CONTACT_NAMES.ALICE,
          messages: [
            'Fuck that. What else are friends for. You still having those night terrors?',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ["I don't want to talk about that right now."],
        },
      ],
    },
  ],
};
