import unknownAvatar from '@apps/Messages/assets/avatars/unkown.jpeg';
import {ConversationType} from 'components/apps/Messages/context/types';
import {
  CONTACT_NAMES,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

export const seamless: ConversationType = {
  name: CONTACT_NAMES.SEAMLESS,
  tags: ['Seamless', 'order', 'food', 'hungry', 'grubhub'],
  date: 'June 24th',
  listContent: 'Your Seamless order from Cozy Corner is here!',
  heroImage: unknownAvatar,
  interfaceColor: getColorFromContacts('seamless')[0],
  exchanges: [
    {
      time: '2021-02-23T17:22:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: [
            'Hungry? is preparing your order, to be delivered between 5:48 PM and 5:58 PM. Track your food online or with the Seamless app seamless.app.',
          ],
        },
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: [
            'Your order is on the way and will arrive between 5:42 PM and 5:52 PM.',
          ],
        },
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: ['Your Seamless driver will arrive with your order soon'],
        },
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: ['Your Seamless order from Hungry? is here!'],
        },
      ],
    },

    {
      time: 'March 7, 2021 5:00pm',
      exchanges: [
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: [
            'Hungry? is preparing your order, to be delivered between 5:48 PM and 5:58 PM. Track your food online or with the Seamless app seamless.app.',
          ],
        },
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: [
            'Your order is on the way and will arrive between 5:32 PM and 5:42 PM.',
          ],
        },
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: ['Your Seamless driver will arrive with your order soon'],
        },
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: ['Your Seamless order from Hungry? is here!'],
        },
      ],
    },

    {
      time: 'March 10, 2022 5:00pm',
      exchanges: [
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: [
            'Cafe @ Klom Klorm is preparing your order, to be delivered between 5:48 PM and 5:58 PM. Track your food online or with the Seamless app seamless.app.',
          ],
        },
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: [
            'Your order is on the way and will arrive between 5:32 PM and 5:42 PM.',
          ],
        },
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: ['Your Seamless driver will arrive with your order soon'],
        },
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: ['Your Seamless order from Cafe @ Klom Klorm is here!'],
        },
      ],
    },
    {
      time: 'March 11, 2021 5:00pm',
      exchanges: [
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: [
            'Peach pit is preparing your order, to be delivered between 5:28 PM and 6:05 PM. Track your food online or with the Seamless app seamless.app.',
          ],
        },
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: [
            'Your order is on the way and will arrive between 5:32 PM and 5:42 PM.',
          ],
        },
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: ['Your Seamless driver will arrive with your order soon'],
        },
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: ['Your Seamless order from Peach Pit is here!'],
        },
      ],
    },
    {
      time: '2023-02-23T17:22:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: [
            'Cozy Corner is preparing your order, to be delivered between 5:48 PM and 5:58 PM. Track your food online or with the Seamless app seamless.app.',
          ],
        },
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: [
            'Your order is on the way and will arrive between 5:32 PM and 5:42 PM.',
          ],
        },
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: ['Your Seamless driver will arrive with your order soon'],
        },
        {
          name: CONTACT_NAMES.SEAMLESS,
          messages: ['Your Seamless order from Cozy Corner is here!'],
        },
      ],
    },
  ],
};
