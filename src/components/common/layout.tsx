import styled from 'styled-components/native';

import {View, Text} from 'react-native';
import theme from 'themes';

export const Layout = styled(View)`
  width: 100%;
  height: 100%;
`;

export const Row = styled(View)`
  flex-direction: row;
  flex-grow: 1;
`;

export const Column = styled(View)``;

export const Cell = styled(Text)`
  border: 1px solid black;
  border-left-width: 0px;
  border-top-width: 0px;
  flex-grow: 1;
  padding: ${theme.spacing.p1}px;
  text-align: center;
  width: 25%;
`;

export const Header = styled(Cell)`
  background: ${theme.colors.brandDark}
  color: white;
`;
