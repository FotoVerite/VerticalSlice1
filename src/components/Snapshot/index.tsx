import {ChildrenProps} from '@shopify/react-native-skia';
import React, {FC} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SnapshotIndicator from './SnapshotIndicator';

const SnapshotView: FC<{snapshotRef: any} & ChildrenProps> = ({
  snapshotRef,
  children,
}) => {
  const insets = useSafeAreaInsets();
  const {width, height} = useWindowDimensions();

  return (
    <View
      style={[
        styles.layout,
        {
          width: width,
          height: height,
          marginTop: insets.top,
          marginBottom: insets.bottom,
        },
      ]}>
      <View style={styles.layout} ref={snapshotRef}>
        {children}
      </View>
      <SnapshotIndicator />
    </View>
  );
};

export default SnapshotView;

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    backgroundColor: '#f1f1f1',
  },
});
