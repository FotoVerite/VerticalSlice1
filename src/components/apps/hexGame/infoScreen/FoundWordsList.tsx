import React, {FC, useContext} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {P, Bold} from 'components/common/StyledText';

import {HexContext} from '../context';

import theme from 'themes';

const FoundWordsList: FC = () => {
  const insets = useSafeAreaInsets();
  const context = useContext(HexContext);

  const renderItem: ListRenderItem<string> = ({item}) => {
    return <P style={{color: 'white'}}>{item}</P>;
  };

  const styles = StyleSheet.create({
    emptyWordList: {
      alignSelf: 'center',
      alignItems: 'center',
    },
    list: {
      padding: theme.spacing.p2,
      marginBottom: insets.bottom + insets.top,
    },
    noWordsFound: {color: 'white', fontSize: 45},
  });

  return (
    <FlatList
      style={styles.list}
      data={Array.from(context.found.state)}
      renderItem={renderItem}
      keyExtractor={(item: any, index) => index + ''}
      ListEmptyComponent={
        <View style={styles.emptyWordList}>
          <Bold style={styles.noWordsFound}>No Words Found </Bold>
        </View>
      }
    />
  );
};

export default FoundWordsList;
