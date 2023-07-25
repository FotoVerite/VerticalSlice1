import React, {FC, useContext} from 'react';
import {StyleSheet} from 'react-native';

import {HexContext} from '../context';

import {P} from 'components/common/StyledText';
import theme from 'themes';

const Points: FC = () => {
  const context = useContext(HexContext);
  return <P style={styles.points}>You Have {context.points.state} Points</P>;
};

export default Points;

const styles = StyleSheet.create({
  points: {color: 'white', padding: theme.spacing.p2},
});
