import React, {FC, useContext} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from 'themes';
import Cursor from '../../Show/MessageInput/Cursor';
import {P} from 'components/common/StyledText';
import {Row} from 'components/common/layout';

const NewMessageInput: FC<{
  contact?: string;
}> = ({contact}) => {
  return (
    <Row style={styles.container}>
      <P>To: </P>
      <View style={[styles.textInput]}>
        {!contact && <Cursor />}
        {contact && <P>{contact}</P>}
        {!contact && (
          <TouchableWithoutFeedback onPress={() => {}}>
            <Icon size={20} name="plus-circle" style={styles.icon} />
          </TouchableWithoutFeedback>
        )}
      </View>
    </Row>
  );
};

export default NewMessageInput;

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.p1,
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#e7e7e7',
    borderColor: '#4b4646a4',
    borderStyle: 'solid',
    borderWidth: 1,

    borderRadius: theme.BorderRadius.small,
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 4,
    flex: 1,
  },
  icon: {
    marginStart: 'auto',
  },
});
