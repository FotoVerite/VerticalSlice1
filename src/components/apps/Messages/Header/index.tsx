import React, {FC, useContext} from 'react';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {P} from 'components/common/StyledText';
import {Row} from 'components/common/layout';
import {screenParams} from 'navigation/screens';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Icon} from 'react-native-elements';

import theme from 'themes';
import {MessagesContext, baseConversation} from '../context';
import {CONVERSATION_REDUCER_ACTIONS} from '../reducers/conversationReducer/types';

const Header: FC = () => {
  const context = useContext(MessagesContext);
  return (
    <Row style={[styles.container]}>
      <TouchableWithoutFeedback
        style={{}}
        onPress={() => {
          //navigation.navigate('Desktop');
        }}>
        <View style={styles.spacer}>
          {/* <Row style={styles.row}>
            <Icon name="chevron-left" color={'black'} size={16} />
            <P style={styles.backButton}>Back</P>
          </Row> */}
        </View>
      </TouchableWithoutFeedback>
      <P style={styles.header}>Messages</P>
      <View style={[styles.spacer]}>
        <TouchableWithoutFeedback
          style={{}}
          onPress={() => {
            context.newMessage.dispatch({
              type: CONVERSATION_REDUCER_ACTIONS.DIGEST_CONVERSATION,
              payload: baseConversation,
            });
          }}>
          <View style={styles.spacer}>
            <Row style={styles.plusIcon}>
              <Icon name="add-circle-outline" color={'black'} size={20} />
            </Row>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Row>
  );
};

export default Header;

const styles = StyleSheet.create({
  backButton: {paddingStart: 0, color: 'black'},
  container: {
    paddingHorizontal: theme.spacing.p1,
    paddingVertical: 4,
    marginTop: 12,
    flexGrow: 0,
    alignItems: 'flex-end',
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 'auto',
  },
  spacer: {
    flex: 1,
  },
  row: {
    alignItems: 'center',
  },
  plusIcon: {
    alignItems: 'flex-end',
    marginStart: 'auto',
  },
});
