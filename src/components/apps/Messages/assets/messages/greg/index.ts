import {ConversationType} from 'components/apps/Messages/context/types';
import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';
import {first_message} from './routes/first';
import {second_message} from './routes/second';
import {third_message} from './routes/third';
import {MESSAGE_TYPE} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {mileena} from '../mileena';
import {chris} from '../chris';

export const greg: ConversationType = {
  name: CONTACT_NAMES.GREG,
  tags: [],
  heroImage: getAvatarFromContacts(CONTACT_NAMES.GREG),
  interfaceColor: getColorFromContacts(CONTACT_NAMES.GREG)[0],
  routes: [second_message, third_message],
  eventBasedRoutes: [first_message],
  exchanges: [
    {
      time: '2019-05-28T23:34:00Z',
      exchanges: [
        //   {
        //     name: CONTACT_NAMES.SELF,
        //     messages: [
        //       {
        //         type: DigestedItemTypes.STRING,
        //         message: 'That was very, very good last night.',
        //         reaction: {name: 'heart', color: '#f487d3'},
        //       },
        //     ],
        //   },
        {
          name: CONTACT_NAMES.GREG,
          messages: ['Agreed, and this morning'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Mmmhm'],
        },
        {
          name: CONTACT_NAMES.GREG,
          messages: [
            'We should plan another session soon',
            {type: MESSAGE_TYPE.VCARD, message: mileena},
            {type: MESSAGE_TYPE.NUMBER, message: chris},
          ],
        },
      ],
    },
  ],
};
