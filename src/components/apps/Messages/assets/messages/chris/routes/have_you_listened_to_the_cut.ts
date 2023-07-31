import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {CHRIS_ROUTE_IDS} from './routes';
import {MESSAGE_TYPE} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

export enum CHRIS_HAVE_YOU_LISTENED_TO_MY_CUT_OPTIONS {
  A = 'Have you listened to the cut I sent you yet?',
}

const OPTIONS = CHRIS_HAVE_YOU_LISTENED_TO_MY_CUT_OPTIONS;
const CHRIS = CONTACT_NAMES.CHRIS;
const SELF = CONTACT_NAMES.SELF;

export const have_you_listened_to_my_cut: MessageRouteType = {
  id: CHRIS_ROUTE_IDS.HAVE_YOU_LISTENED_TO_THE_CUT,
  options: Object.values(OPTIONS),
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [OPTIONS.A],
      },
      {
        name: CHRIS,
        messages: ['Enough to delete it for boring me to death.'],
      },
      {
        name: SELF,
        messages: ['Thanks, you really help myself confidence.'],
      },
      {
        name: CHRIS,
        messages: [
          'Welp, stop sucking, my dude',
          'I mean sucking isn’t always bad but in this case.',
          {type: MESSAGE_TYPE.EMOJI, message: '😈'},
        ],
      },
      {
        name: SELF,
        messages: ['I have no idea what you are talking about'],
      },
      {
        name: CHRIS,
        messages: [
          'Yes a fine gentleman like yourself knows only of being serviced and not serving others.Enough to delete it for boring me to death.',
        ],
      },
      {
        name: SELF,
        messages: [
          {type: MESSAGE_TYPE.EMOJI, message: '🫠🫠🫠'},
          'Your humor is awful. It’s like getting hit in the face by a shit pie.',
        ],
      },
      {
        name: CHRIS,
        messages: ['You only hate it cause I speak truth to power.'],
      },
      {
        name: SELF,
        messages: [
          'I sometimes wonder if you even know what you mean by what you type.',
          'What about you, you’ve finished anything',
        ],
      },
      {
        name: CHRIS,
        messages: ['I did noodle on something myself.'],
      },
      {
        name: SELF,
        messages: ['Well send it'],
      },
      {
        name: CHRIS,
        messages: ["It's not ready yet"],
      },
      {
        name: SELF,
        messages: ["Tell me it's at least not more chip tunes"],
      },
      {
        name: CHRIS,
        messages: ['Well i’m not doing soundcloud shit. Boring beyond belief.'],
      },
      {
        name: SELF,
        messages: [
          'I wasn’t suggesting that. But everything you do is pretty derivative right now',
        ],
      },
      {
        name: CHRIS,
        messages: [
          'All music is derivations. They’re just interesting derivations.',
        ],
      },
      {
        name: SELF,
        messages: ['Okay yes, I did say that last time we hung out'],
      },
      {
        name: CHRIS,
        messages: [
          'I seem to remember you doing more then just talking mad shit about how boring my music is.',
        ],
      },
      {
        name: SELF,
        messages: [
          'Guess I was in a coma from boredom then, I remember nothing.',
        ],
      },
      {
        name: CHRIS,
        messages: [
          "Sometimes I can't figure out if your intentionally being an asshole or just born that way",
        ],
      },
    ],
  },
};
