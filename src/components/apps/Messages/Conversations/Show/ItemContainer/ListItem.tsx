import React, {FC, memo} from 'react';
import Animated, {SharedValue} from 'react-native-reanimated';
import {
  DigestedConversationListItem,
  DigestedItemTypes,
} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

import {BlockTimeStamp} from './BlockTimeStamp';
import {BaseBubble} from './BaseBubble';
import {TypingBubble} from './TypingBubble';
import {ConversationReducerActionsType} from 'components/apps/Messages/reducers/conversationReducer/types';

const ListItem: FC<{
  dispatch: (action: ConversationReducerActionsType) => Promise<void>;
  item: DigestedConversationListItem;
  index: number;
  scrollHandler: SharedValue<number>;
  scrollRef: React.RefObject<Animated.ScrollView>;
  group: boolean;
}> = ({dispatch, item, index, scrollHandler, scrollRef, group}) => {
  if (item.type === DigestedItemTypes.TIME) {
    return <BlockTimeStamp dispatch={dispatch} {...item} />;
  } else if (item.messageDelay && item.leftSide) {
    return (
      <TypingBubble
        dispatch={dispatch}
        item={item}
        index={index}
        scrollHandler={scrollHandler}
        scrollRef={scrollRef}
        group={group}
      />
    );
  } else {
    return (
      <BaseBubble
        dispatch={dispatch}
        item={item}
        index={index}
        scrollHandler={scrollHandler}
        scrollRef={scrollRef}
        group={group}
      />
    );
  }
};

export default memo(ListItem);
