import Hex from 'components/apps/hexGame';

export const SCREENS = {
  Hex: {
    title: 'HexGame',
    component: Hex,
  },
};

export type screenParams = {
  Hex: undefined;
};

export type AppRoutes = keyof typeof SCREENS;

export type NavigationParamList = {} & {
  [P in keyof typeof SCREENS]: screenParams[P];
};
