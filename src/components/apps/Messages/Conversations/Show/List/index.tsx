import {DigestedConversationListItem} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {DigestedConversationType} from 'components/apps/Messages/context/types';
import React, {FC} from 'react';
import {View, useWindowDimensions, StyleSheet} from 'react-native';
import Animated, {useScrollViewOffset} from 'react-native-reanimated';
import theme from 'themes';
import Footer from './Footer';
import {ConversationShowRefs} from '..';
import ListItem from '../ItemContainer/ListItem';
import {ConversationReducerActionsType} from 'components/apps/Messages/reducers/conversationReducer/types';

function ListHeader() {
  return <View style={styles.listHeader} />;
}

function NewMessageListHeader() {
  return <View />;
}

export const DELIVERED_READ_HEIGHT = 20;

const List: FC<
  {
    conversation: DigestedConversationType | undefined;
    dispatch: (action: ConversationReducerActionsType) => void;
    newMessage?: boolean;
  } & ConversationShowRefs
> = ({animatedScrollRef, conversation, dispatch, footerHeight, newMessage}) => {
  const {width} = useWindowDimensions();
  const scrollHandler = useScrollViewOffset(animatedScrollRef);

  return (
    <Animated.FlatList
      ref={animatedScrollRef}
      key={conversation?.name}
      style={[styles.list, {width: width}]}
      data={conversation?.exchanges}
      renderItem={({item, index}) => (
        <ListItem
          contactName={conversation?.name}
          dispatch={dispatch}
          item={item}
          group={conversation?.group || false}
          scrollHandler={scrollHandler}
          index={index}
          scrollRef={animatedScrollRef}
        />
      )}
      keyExtractor={(item: DigestedConversationListItem, index) =>
        `${conversation?.name}-${index}`
      }
      ListHeaderComponent={newMessage ? NewMessageListHeader : ListHeader}
      ListFooterComponent={
        <Footer footerHeight={footerHeight} dispatch={dispatch} />
      }
      getItemLayout={(data, index) => ({
        length: data[index].height + data[index].paddingBottom,
        offset: data[index].offset,
        index,
      })}
      maxToRenderPerBatch={10}
      scrollEventThrottle={16}
    />
  );
};

export default List;

const styles = StyleSheet.create({
  listHeader: {
    height: 0,
    marginBottom: theme.spacing.p3,
  },
  listFooter: {
    height: 0,
    marginBottom: theme.spacing.p2 + 50,
  },
  list: {
    padding: theme.spacing.p1,
    paddingBottom: 0,
    flexGrow: 1,
  },
  itemSeparator: {
    height: 1,
    marginVertical: 10,
    backgroundColor: 'gray',
  },
});
