import React, {FC, useContext, useMemo} from 'react';
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {CONVERSATION_REDUCER_ACTIONS} from '../../reducers/conversationReducer/types';

import {Bold, P} from 'components/common/StyledText';
import {Row} from 'components/common/layout';

import {ConversationType} from '../../context/types';
import {MessagesContext} from '../../context';

import {EventOrchestraContext} from 'components/EventOrchestra/context';

import theme from 'themes';
import {getLastSeenRoute} from '../../reducers/conversationReducer/routing/seen';
import {determineLogLine} from '../../context/conversationFunctions';

const ConversationListItem: FC<{conversation: ConversationType}> = ({
  conversation,
}) => {
  const context = useContext(MessagesContext);
  const eventContext = useContext(EventOrchestraContext);

  const logLine = useMemo(
    () =>
      determineLogLine(
        conversation,
        getLastSeenRoute(
          conversation.name,
          eventContext.events.state,
          conversation.routes,
          conversation.eventBasedRoutes,
        ),
      ),
    [conversation, eventContext.events.state],
  );
  return (
    <TouchableOpacity
      onPress={() => {
        context.conversation.dispatch({
          type: CONVERSATION_REDUCER_ACTIONS.DIGEST_CONVERSATION,
          payload: conversation,
        });
      }}>
      <Row>
        <Image source={conversation.heroImage} style={styles.image} />
        <View style={styles.content}>
          <Row style={styles.infoRow}>
            <Bold>{conversation.name}</Bold>
            <Row style={styles.dateRow}>
              <P style={styles.date}>{logLine.time}</P>
              <Icon name="chevron-right" color={'black'} size={24} />
            </Row>
          </Row>
          <P>{logLine.content}</P>
        </View>
      </Row>
    </TouchableOpacity>
  );
};

export default ConversationListItem;

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    marginRight: theme.spacing.p2,
    overflow: 'hidden',
    aspectRatio: 1,
    borderRadius: 25,
  },
  infoRow: {
    flexGrow: 0,
  },
  dateRow: {
    flexGrow: 0,
    marginLeft: 'auto',
    alignItems: 'center',
  },
  date: {},
  content: {
    flex: 1,
    alignSelf: 'center',
  },
});
