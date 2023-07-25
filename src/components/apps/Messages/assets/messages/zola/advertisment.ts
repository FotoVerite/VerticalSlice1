import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ConversationExchangeType} from '../../../context/types';
import {DigestedItemTypes} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

export const advertisementExchange: ConversationExchangeType = {
  time: '2021-05-20T14:00:00Z',
  exchanges: [
    {
      name: CONTACT_NAMES.ZOLA,
      messages: ['View down again this month. I have no idea what to do'],
    },
    {
      name: CONTACT_NAMES.SELF,
      messages: ['What changed'],
    },
    {
      name: CONTACT_NAMES.ZOLA,
      messages: [
        "Fuck if I know. I've combed my comments,checked my discord, scoped my competition.",
        "It isn't my content. I'm just not growing 🌝 enough.",
      ],
    },
    {
      name: CONTACT_NAMES.SELF,
      messages: ['Have you tried having your thumbnails you with an O face.'],
    },
    {
      name: CONTACT_NAMES.ZOLA,
      messages: [
        {type: DigestedItemTypes.EMOJI, message: '🙄'},
        "I don't want to give 2019 attitude. Maybe I'll start doing livestreams in a hot tub",
      ],
    },
    {
      name: CONTACT_NAMES.SELF,
      messages: ['Would it hurt.'],
    },
    {
      name: CONTACT_NAMES.ZOLA,
      messages: [
        'Sadly, probably not. I wish I could just block all the misogynistic creeps who watch me as jack-off material.',
        "It's fucking makeup and nails, I'm not doing squats in tights like hopescope.",
        'Not that she deserves it either.',
      ],
    },
    {
      name: CONTACT_NAMES.SELF,
      messages: [
        "Hopescope/Tights, now we truly are in 2019. Isn't she doing lost luggages reviews now.",
      ],
    },
    {
      name: CONTACT_NAMES.ZOLA,
      messages: [
        'Starting to.',
        'Probably a pivot, she saturated the market. Ugh I wish I could grind as hard as her.',
        'Doing a video a week is destroying me',
      ],
    },

    {
      name: CONTACT_NAMES.ZOLA,
      messages: ['Get dinner with me, I need to stop looking at my metrics'],
    },
  ],
};
