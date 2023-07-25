import {TextBoxDialoguesType} from 'components/TextBoxEngine/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

export const testScript: TextBoxDialoguesType = {
  id: CONTACT_NAMES.ALICE,
  screenConfiguration: {
    fadeInDelay: 2000,
  },
  dialogues: [
    {name: CONTACT_NAMES.ALICE, content: 'This is the first screen'},
    {name: CONTACT_NAMES.ALICE, content: 'This is the second screen'},
    {name: CONTACT_NAMES.ALICE, content: 'This is the third screen'},
  ],
};
