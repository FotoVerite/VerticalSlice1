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

const List: FC<
  {
    conversation: DigestedConversationType | undefined;
    dispatch: (action: ConversationReducerActionsType) => Promise<void>;
  } & ConversationShowRefs
> = ({conversation, dispatch, footerHeight, animatedScrollRef}) => {
  const {width} = useWindowDimensions();
  const scrollHandler = useScrollViewOffset(animatedScrollRef);

  return (
    <Animated.FlatList
      ref={animatedScrollRef}
      style={[styles.list, {width: width}]}
      data={conversation?.exchanges}
      renderItem={({item, index}) => (
        <ListItem
          dispatch={dispatch}
          item={item}
          group={conversation?.group || false}
          scrollHandler={scrollHandler}
          index={index}
          scrollRef={animatedScrollRef}
          key={`item-${index}`}
        />
      )}
      keyExtractor={(item: DigestedConversationListItem, index) =>
        `$conversation.name}-${index}`
      }
      ListHeaderComponent={ListHeader}
      ListFooterComponent={<Footer footerHeight={footerHeight} />}
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
  screen: {
    zIndex: 2,
    position: 'absolute',
  },
});
