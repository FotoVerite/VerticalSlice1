import React, {FC} from 'react';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TouchableHighlight, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import {screenParams} from 'navigation/screens';

import {P} from 'components/common/StyledText';
import {Row} from 'components/common/layout';

import theme from 'themes';
import Hamburger from './Hamburger';

const Header: FC = () => {
  const navigation = useNavigation<StackNavigationProp<screenParams>>();
  const insets = useSafeAreaInsets();
  return (
    <Row style={[styles.container]}>
      <TouchableHighlight
        underlayColor="#eeeeee"
        style={{borderRadius: 5}}
        onPress={() => {
          //navigation.navigate('Desktop');
        }}>
        <Row style={styles.controls}>
          <Icon name="chevron-left" color={'white'} size={16} />
          <P style={styles.backButton}>Back</P>
        </Row>
      </TouchableHighlight>
      <Hamburger />
    </Row>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.p2,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 5,
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {paddingStart: theme.spacing.p1, color: 'white'},
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  controls: {
    alignItems: 'center',
  },
});
