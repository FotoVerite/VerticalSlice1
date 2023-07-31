import React, {FC, useContext, useMemo} from 'react';
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {CONVERSATION_REDUCER_ACTIONS} from '../../reducers/conversationReducer/types';

import {Bold, P} from 'components/common/StyledText';
import {Row} from 'components/common/layout';

import {ConversationType} from '../../context/types';
import {MessagesContext} from '../../context';

import {EventOrchestraContext} from 'components/EventOrchestra/context';

import {getLastSeenRoute} from '../../reducers/conversationReducer/routing/seen';
import {determineLogLine} from '../../context/conversationFunctions';
import {CONTACT_NAMES} from '../../context/usersMapping';
import theme from 'themes';

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

  const unhomelike = (name: CONTACT_NAMES, logline: string) => {
    if (![CONTACT_NAMES.SPAM1].includes(name)) {
      return logline;
    } else if (
      ![5, 6, 7].includes(
        eventContext.events.state.Message[CONTACT_NAMES.ZOLA].views.length,
      )
    ) {
      return logline;
    } else {
      return "Ŷ̴̨͔̣̮̪̱͙̫̼̣̟͜o̴̬̽̀̊̋̇̒͑̃̏̈́̐ư̶͚͕̩͈̗͎͙̼̫̹͛̓̍́̈́̚'̴̠͈̺͇͉̏͜l̶͍̩͈͓͇͆̀̀̓͠͠l̶̡͓̪͉̩͕̩̪̥̝̥̱̅͋̂̆͗̊̈͋̑̚͠ ̷̛̛͙̺͇̤̪̭̱͒̋̑̀͆̓͂͌̋͑͘͜͝n̶͙̺̩̹̼̟͙̦̂ḙ̴̡͛͝v̵̧̨͔̪̯͚̖̭͓̞̩̮̱́͘ḙ̵̡̭͕̥̬̣̭͓͠ŗ̴͙̹̹̇͐̓͂̎̇̆͗̀̌̆ ̵̗̱̪̝̃́̇̍̇̈́̽̈́̆̌͜b̴̢̧̛͇͚̘̯̼̣̣̰̪̪̯̹̽͐̐͋̌͑͘̕è̸̡̧̘̠͕̩̹̗̫͚̞̇̈́̃͆̊̚͘ ̷̢̤̲͎͚̠̮̮̤̤̬̍g̸̢͕̹̥̦͓̭͈̮̩̥͇̱̿̈́͑̓͂̾͒̈́͌̇̅ͅơ̷̡̤͎͇̝̺͎̪͎̦͇̟͌̌͛̎̀̑̑͑̉͛͜o̴̧̺̰̍̆̈́͗̇͋̐͑̏̑͝d̶̢̧̨̝̞̖̲͇̫̰̭̬͕̈́͒͗̕͜ͅ ̸̤̟̩̝̼̮͓̪̞͔̇̅̀̀̄̚͘̚͠ȩ̸̡̺̲̤̩͈͉̼̍̋̽͂̀ͅñ̷̨̛̛̰̟̬̰͕̝̜͉̰̟͇̳̀̏̔̌̽̕͠͝ǫ̴̼͚̼̱͈͚̥̩̪̯͂̅͒͒̅ư̴̜̭͓̅͊̌̒̒͋g̶̳͇̐̊̚h̶̨̫͉̦̬͎͕͇̲͎͋͑͒̒̿̓";
    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        context.conversation.dispatch({
          type: CONVERSATION_REDUCER_ACTIONS.DIGEST_CONVERSATION,
          payload: conversation,
        });
      }}>
      <Row>
        <View
          style={[
            styles.availableRouteIndicator,
            {
              backgroundColor: conversation.hasAvailableRoute
                ? conversation.interfaceColor
                : 'transparent',
            },
          ]}
        />
        <Image source={conversation.heroImage} style={styles.image} />
        <View style={styles.content}>
          <Row style={styles.infoRow}>
            <Bold>{conversation.name}</Bold>
            <Row style={styles.dateRow}>
              <P style={styles.date}>{logLine.time}</P>
              <Icon
                name="chevron-right"
                color={'black'}
                size={24}
                style={styles.chevron}
              />
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
  availableRouteIndicator: {
    height: 12,
    width: 6,
    alignSelf: 'center',
    borderTopEndRadius: theme.BorderRadius.normal,
    borderBottomEndRadius: theme.BorderRadius.normal,
    marginEnd: theme.spacing.p1 / 2,
  },
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
    alignItems: 'center',
  },
  dateRow: {
    flexGrow: 0,
    marginLeft: 'auto',
  },
  date: {},
  chevron: {
    marginStart: 'auto',
    width: 18,
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    marginEnd: theme.spacing.p1,
  },
});
