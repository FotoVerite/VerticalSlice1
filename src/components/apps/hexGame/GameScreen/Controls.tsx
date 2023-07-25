import React, {FC, useContext} from 'react';

import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

import {StyleSheet} from 'react-native';
import {HexSharedValues} from '../context/animation';
import {checkAnswer} from '../controller';
import {HexContext} from '../context';

import {Row} from 'components/common/layout';

import theme from 'themes';

const HexControl: FC = () => {
  const context = useContext(HexContext);
  const sharedValues = useContext(HexSharedValues);

  const styles = StyleSheet.create({
    buttonText: {color: 'black'},
    button: {
      backgroundColor: 'white',
      padding: theme.spacing.p1,
      paddingHorizontal: theme.spacing.p2,
      borderRadius: 15,
      height: theme.spacing.p4,
    },
    row: {
      justifyContent: 'space-between',
      bottom: 40,
      paddingHorizontal: theme.spacing.p3,
      flexGrow: 0,
    },
  });

  return (
    <Row style={styles.row}>
      <Button
        title={'Delete'}
        titleStyle={styles.buttonText}
        buttonStyle={styles.button}
        onPress={() => {
          context.word.set(word => word.slice(0, -1));
        }}
      />
      <Button
        titleStyle={styles.buttonText}
        buttonStyle={styles.button}
        icon={<Icon name={'cycle'} size={24} />}
        onPress={() =>
          context.letters.set(letters => Object.assign([], letters.reverse()))
        }
      />

      <Button
        title={'Enter'}
        titleStyle={styles.buttonText}
        buttonStyle={styles.button}
        onPress={() => checkAnswer(context, sharedValues)}
      />
    </Row>
  );
};

export default HexControl;
