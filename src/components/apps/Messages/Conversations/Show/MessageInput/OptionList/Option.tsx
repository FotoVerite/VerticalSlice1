import React, {FC, useCallback, useContext} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {P} from 'components/common/StyledText';
import {Row} from 'components/common/layout';
import theme from 'themes';
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from 'components/apps/Messages/reducers/conversationReducer/types';
import {EventOrchestraContext} from 'components/EventOrchestra/context';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';

const Option: FC<{
  setActive: (boolean: boolean) => void;
  dispatch: (action: ConversationReducerActionsType) => Promise<void>;
  id: number;
  name: CONTACT_NAMES;
  option: string;
}> = ({setActive, dispatch, id, name, option}) => {
  const eventSet = useContext(EventOrchestraContext).events.set;

  const setPathAsSeen = useCallback(
    (_name: CONTACT_NAMES, _id: number, chosen: string) => {
      eventSet(state => {
        const newState = Object.assign({}, state);
        const seenRoutes = newState.Message[_name].routes;
        seenRoutes[_id] = {
          chosen: chosen.toString(),
          date: new Date(),
          position: Object.keys(seenRoutes).length + 1,
        };
        return newState;
      });
    },
    [eventSet],
  );

  return (
    <TouchableOpacity
      onPress={() => {
        setActive(false);
        setPathAsSeen(name, id, option);
        dispatch({
          type: CONVERSATION_REDUCER_ACTIONS.START_ROUTE,
          payload: {id: id, chosenOption: option},
        });
      }}>
      <Row style={styles.container}>
        <View style={styles.content}>
          <Row style={styles.infoRow}>
            <Row style={styles.dateRow}>
              <P style={styles.content}>{option}</P>
              <Icon
                name="chevron-right"
                color={'black'}
                size={24}
                style={styles.icon}
              />
            </Row>
          </Row>
        </View>
      </Row>
    </TouchableOpacity>
  );
};

export default Option;

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.p1 / 2,
    marginHorizontal: theme.spacing.p1,

    backgroundColor: '#ebebed',
    borderRadius: theme.BorderRadius.small,
    alignItems: 'center',
    height: 50,
  },
  content: {
    flex: 1,
    fontSize: 16,
    marginStart: theme.spacing.p1 / 2,
  },
  infoRow: {
    flexGrow: 0,
  },
  icon: {
    marginStart: 'auto',
  },
  dateRow: {
    alignItems: 'center',
  },
  date: {},
});
