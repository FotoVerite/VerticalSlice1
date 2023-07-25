import styled from 'styled-components/native';
import {View, Text, Platform} from 'react-native';
import theme, {spacing} from 'themes';

type fontSize = 's' | 'm' | 'ml' | 'l' | 'xl' | 'xxl';

const convertSymboltoFontSize = (size?: fontSize) => {
  switch (size) {
    case 's':
      return theme.FontSize.small;
    case 'm':
      return theme.FontSize.medium;
    case 'ml':
      return theme.FontSize.ml;
    case 'l':
      return theme.FontSize.large;
    case 'xl':
      return theme.FontSize.xl;
    case 'xxl':
      return theme.FontSize.xxl;
    default:
      return theme.FontSize.small;
  }
};

export const ErrorText = styled(Text)`
  color: red;
  font-weight: bold;
  font-size: ${theme.FontSize.small}px;
  margin: auto;
`;

export const Bold = styled(Text)<{
  size?: fontSize;
  p?: spacing;
  pt?: spacing;
  pr?: spacing;
  pb?: spacing;
  pl?: spacing;
  ph?: spacing;
  pv?: spacing;
}>`
  color: #000;
  font-weight: bold;
  font-size: ${props => `${convertSymboltoFontSize(props.size)}px`};
  font-family: ${Platform.OS === 'ios' ? 'Menlo' : 'SourceSansProBold'};
  ${({p}) => p && `padding: ${theme.spacing[p]}px;`}
  ${({pt}) => pt && `padding-top: ${theme.spacing[pt]}px;`}
  ${({pr}) => pr && `padding-right: ${theme.spacing[pr]}px;`}
  ${({pb}) => pb && `padding-bottom: ${theme.spacing[pb]}px;`}
  ${({pl}) => pl && `padding-left: ${theme.spacing[pl]}px;`}
  ${({ph}) =>
    ph &&
    `padding-top: ${theme.spacing[ph]}px; padding-bottom: ${theme.spacing[ph]}px;`}
  ${({pv}) =>
    pv &&
    `padding-left: ${theme.spacing[pv]}px; padding-right: ${theme.spacing[pv]}px;`}
`;

export const SimpleText = styled(Text)<{
  size?: fontSize;
  p?: spacing;
  pt?: spacing;
  pr?: spacing;
  pb?: spacing;
  pl?: spacing;
  ph?: spacing;
  pv?: spacing;
}>`
  color: #000;
  font-size: ${props => `${convertSymboltoFontSize(props.size)}px`};
  ${({p}) => p && `padding: ${theme.spacing[p]}px;`}
  ${({pt}) => pt && `padding-top: ${theme.spacing[pt]}px;`}
  ${({pr}) => pr && `padding-right: ${theme.spacing[pr]}px;`}
  ${({pb}) => pb && `padding-bottom: ${theme.spacing[pb]}px;`}
  ${({pl}) => pl && `padding-left: ${theme.spacing[pl]}px;`}
  ${({ph}) =>
    ph &&
    `padding-top: ${theme.spacing[ph]}px; padding-bottom: ${theme.spacing[ph]}px;`}
  ${({pv}) =>
    pv &&
    `padding-left: ${theme.spacing[pv]}px; padding-right: ${theme.spacing[pv]}px;`}
`;

export const P = styled(Text)<{
  size?: fontSize;
  p?: spacing;
  pt?: spacing;
  pr?: spacing;
  pb?: spacing;
  pl?: spacing;
  ph?: spacing;
  pv?: spacing;
}>`
  color: #000;
  font-size: ${props => `${convertSymboltoFontSize(props.size)}px`};
  margin: 2px 0;
  ${({p}) => p && `padding: ${theme.spacing[p]}px;`}
  ${({pt}) => pt && `padding-top: ${theme.spacing[pt]}px;`}
  ${({pr}) => pr && `padding-right: ${theme.spacing[pr]}px;`}
  ${({pb}) => pb && `padding-bottom: ${theme.spacing[pb]}px;`}
  ${({pl}) => pl && `padding-left: ${theme.spacing[pl]}px;`}
  ${({ph}) =>
    ph &&
    `padding-top: ${theme.spacing[ph]}px; padding-bottom: ${theme.spacing[ph]}px;`}
  ${({pv}) =>
    pv &&
    `padding-left: ${theme.spacing[pv]}px; padding-right: ${theme.spacing[pv]}px;`}
    font-family: ${Platform.OS === 'ios'
    ? ' Helvetica Neue'
    : 'WorkSansRegular'};
  font-weight: 500;
`;

export const NoteText = styled(Text)<{
  size?: fontSize;
  p?: spacing;
  pt?: spacing;
  pr?: spacing;
  pb?: spacing;
  pl?: spacing;
  ph?: spacing;
  pv?: spacing;
}>`
  color: #fff;
  font-size: ${props => `${convertSymboltoFontSize(props.size || 'm')}px`};
  margin: 2px 0;
  ${({p}) => p && `padding: ${theme.spacing[p]}px;`}
  ${({pt}) => pt && `padding-top: ${theme.spacing[pt]}px;`}
  ${({pr}) => pr && `padding-right: ${theme.spacing[pr]}px;`}
  ${({pb}) => pb && `padding-bottom: ${theme.spacing[pb]}px;`}
  ${({pl}) => pl && `padding-left: ${theme.spacing[pl]}px;`}
  ${({ph}) =>
    ph &&
    `padding-top: ${theme.spacing[ph]}px; padding-bottom: ${theme.spacing[ph]}px;`}
  ${({pv}) =>
    pv &&
    `padding-left: ${theme.spacing[pv]}px; padding-right: ${theme.spacing[pv]}px;`}
    font-family: ${Platform.OS === 'ios' ? 'Menlo' : 'monospace'};
`;

export const Highlight = styled(View)<{
  borderRadius?: 'small' | 'normal';
  outline?: boolean;
}>`
  background-color: ${props =>
    props.outline ? 'white' : theme.colors.brandDark};
  border: ${props =>
    props.outline ? `1px solid ${theme.colors.brand}` : 'none'};
  border-radius: ${props =>
    `${theme.BorderRadius[props.borderRadius || 'small']}px`};
  padding: 10px;
`;
