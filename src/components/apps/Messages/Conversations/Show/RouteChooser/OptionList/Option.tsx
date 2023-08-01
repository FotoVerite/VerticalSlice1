import React, {FC} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {P} from 'common/styles/StyledText';
import {Row} from 'common/styles/layout';
import theme from 'themes';

const Option: FC<{
  cb: () => void;
  id: number;
  option: string;
}> = ({cb, option}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        cb();
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
