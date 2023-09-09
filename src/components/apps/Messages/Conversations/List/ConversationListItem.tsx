import React, {FC, ReactElement, useContext, useEffect, useState} from 'react';
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Bold, P} from 'common/styles/StyledText';
import {Row} from 'common/styles/layout';

import {ConversationType} from '../../context/types';
import {MessagesContext} from '../../context';

import {EventOrchestraContext} from 'components/EventOrchestra/context';
import theme from 'themes';
import {messageAppConditionsMet} from '../../reducers/conversationReducer/routing/available';
import {MessageEffectType} from '../../reducers/conversationReducer/digestion/types';

const ConversationListItem: FC<{conversation: ConversationType}> = ({
  conversation,
}) => {
  const context = useContext(MessagesContext);
  const eventContext = useContext(EventOrchestraContext);

  const [replacementLogline, setReplacementLogline] = useState<ReactElement>();

  useEffect(() => {
    if (!conversation.effects) {
      return;
    }
    if (!context.listCovered.state) {
      return;
    }
    const viableEffect = conversation.effects.reduce((acc, effect) => {
      const viable = messageAppConditionsMet(
        eventContext.events.state.Message,
        effect.conditions,
      );
      if (viable) {
        acc.push(effect);
      }
      return acc;
    }, [] as MessageEffectType[])[0];
    if (viableEffect) {
      setReplacementLogline(React.cloneElement(viableEffect.data));
    } else {
      setReplacementLogline(undefined);
    }
  }, [context, conversation, eventContext.events.state]);

  return (
    <TouchableOpacity
      onPress={() => {
        if (!context.conversation.state) {
          context.conversation.digest(conversation);
        }
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
              <P style={styles.date}>{conversation.logline?.time}</P>
              <Icon
                name="chevron-right"
                color={'black'}
                size={24}
                style={styles.chevron}
              />
            </Row>
          </Row>
          {replacementLogline ? (
            replacementLogline
          ) : (
            <P>{conversation.logline?.content}</P>
          )}
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
