import arialAvatar from '@apps/Messages/assets/avatars/alice_avator.jpg';
import aliceAvatar from '@apps/Messages/assets/avatars/alice_avator.jpg';

import defaultAvatar from '@apps/Messages/assets/avatars/unkown.jpeg';
import darkoAvatar from '@apps/Messages/assets/avatars/donnie-darko.jpg';

import zaraAvatar from '../assets/avatars/Zara.jpg';
import chrisAvatar from '../assets/avatars/Chris.jpg';
import graceAvatar from '@apps/Messages/assets/avatars/grace.jpg';
import gregAvatar from '@apps/Messages/assets/avatars/greg.jpg';
import micahaelAvatar from '@apps/Messages/assets/avatars/michael_avatar.jpeg';

import steveLitt from '@apps/Messages/assets/avatars/steve_litt.png';

import meleenaAvatar from '@apps/Messages/assets/avatars/mileena_avatar.jpg';
import {ImageSourcePropType} from 'react-native';

export enum CONTACT_NAMES {
  ARIAL = 'Arial',
  ALICE = 'Alice',
  BASE = '',
  CHRIS = 'Chris',
  CLAY = 'Clay',
  CUSTOMER_SERVICE = '401112',
  GRACE_RUSSO = 'Grace Russo',
  GREG = 'Fuck Face',
  LENNY = 'Maybe: Lenny',
  LEO = '1-201-657-5252',
  MILEENA = 'Mileena',
  MICHAEL = 'Maybe: Michael',
  MOVIE_NIGHT = 'Movie Night',
  SELF = 'Self',
  STEVE_LITT = 'Steve-0',
  TEST = 'Test',
  TEST2 = 'Test2',
  ZOLA = 'Maybe: Zara',
  DEFAULT = 'Default',
  SEAMLESS = '30368',
  SPAM1 = '1-222-666-1337',
  SPAM2 = '1-225-666-1337',
  SPAM3 = '1-226-666-1337',
  SPAM4 = '1-227-666-1337',
}

export type UserMappingType = {
  avatar: ImageSourcePropType;
  colors: string[];
};
export const contactConsts: {[key in CONTACT_NAMES]: UserMappingType} = {
  '': {avatar: defaultAvatar, colors: ['#6b6b6d', '#363243']},
  '1-222-666-1337': {avatar: defaultAvatar, colors: ['#6b6b6d', '#363243']},
  Arial: {avatar: arialAvatar, colors: ['#dbaf48', '#cdc8bb']},
  Alice: {avatar: aliceAvatar, colors: ['#d0bd28', '#cdc8bb']},
  Chris: {avatar: chrisAvatar, colors: ['#6bd8e4', '#363243']},
  Clay: {avatar: chrisAvatar, colors: ['#6bd8e4', '#363243']},
  [CONTACT_NAMES.CUSTOMER_SERVICE]: {
    avatar: defaultAvatar,
    colors: ['#6b6b6d', '#363243'],
  },

  'Fuck Face': {avatar: gregAvatar, colors: ['#48ee4e', '#363243']},
  'Grace Russo': {avatar: graceAvatar, colors: ['#EE6548', '#363243']},
  [CONTACT_NAMES.LEO]: {
    avatar: defaultAvatar,
    colors: ['#f5d742', '#363243'],
  },
  [CONTACT_NAMES.LENNY]: {
    avatar: defaultAvatar,
    colors: ['#6b6b6d', '#363243'],
  },
  Mileena: {avatar: meleenaAvatar, colors: ['#ff0095', '#80194d']},
  'Maybe: Michael': {avatar: gregAvatar, colors: ['#f54295', '#8900fa']},
  'Movie Night': {avatar: darkoAvatar, colors: ['#6b6b6d', '#363243']},
  Self: {avatar: defaultAvatar, colors: ['blue', '#363243']},
  [CONTACT_NAMES.SPAM2]: {
    avatar: defaultAvatar,
    colors: ['#6b6b6d', '#363243'],
  },
  [CONTACT_NAMES.SPAM3]: {
    avatar: defaultAvatar,
    colors: ['#6b6b6d', '#363243'],
  },
  [CONTACT_NAMES.SPAM4]: {
    avatar: defaultAvatar,
    colors: ['#6b6b6d', '#363243'],
  },
  'Steve-0': {avatar: steveLitt, colors: ['#FF002D', '#C3596B']},
  Test: {avatar: defaultAvatar, colors: ['#FF002D', '#C3596B']},
  Test2: {avatar: defaultAvatar, colors: ['#FF002D', '#C3596B']},
  [CONTACT_NAMES.ZOLA]: {avatar: zaraAvatar, colors: ['#b46be4', '#363243']},
  30368: {avatar: defaultAvatar, colors: ['#6b6b6d', '#363243']},
  Default: {avatar: defaultAvatar, colors: ['#6b6b6d', '#363243']},
};

export const getColorFromContacts = (name: CONTACT_NAMES | string) => {
  if (Object.values(CONTACT_NAMES).some(v => v === name)) {
    return contactConsts[name as CONTACT_NAMES].colors;
  } else {
    return contactConsts[CONTACT_NAMES.DEFAULT].colors;
  }
};

export const getAvatarFromContacts = (name: CONTACT_NAMES | 'string') => {
  if (Object.values(CONTACT_NAMES).some(v => v === name)) {
    return contactConsts[name as CONTACT_NAMES].avatar;
  } else {
    return contactConsts[CONTACT_NAMES.DEFAULT].avatar;
  }
};
