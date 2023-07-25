import React, {FC, useContext} from 'react';

import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {HexSharedValues} from '../context/animation';

import {showScoreBoard} from '../controller';

import theme from 'themes';

const Hamburger: FC = () => {
  const hexSharedValues = useContext(HexSharedValues);
  return (
    <Button
      title=""
      buttonStyle={styles.hamburger}
      onPress={() => showScoreBoard(hexSharedValues)}
      icon={<Icon name="check" color={'yellow'} />}
    />
  );
};

export default Hamburger;

const styles = StyleSheet.create({
  hamburger: {
    padding: 5,
    marginLeft: theme.spacing.p2,
  },
});
