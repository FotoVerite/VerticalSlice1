import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  Image,
  ImageURISource,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
  ImageSourcePropType,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import theme from 'themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MessagesContext} from 'components/apps/Messages/context';
import {Row} from 'components/common/layout';
import {P} from 'components/common/StyledText';

const MediaView: FC = () => {
  const {width, height} = useWindowDimensions();

  const insets = useSafeAreaInsets();

  const context = useContext(MessagesContext);
  const media = useRef<ReactElement>();

  const showMedia = useSharedValue(0);

  if (context.media.state != null) {
    media.current = React.cloneElement(context.media.state);
  }

  const AnimateMediaTop = useAnimatedStyle(() => {
    if (context.media.state) {
      showMedia.value = withTiming(1, {duration: 750});
    } else {
      showMedia.value = withTiming(0, {duration: 750});
    }
    return {
      marginTop: interpolate(showMedia.value, [0, 1], [height, 0]),
    };
  }, [context.media.state]);

  return (
    <Animated.View
      style={[
        {height: height - (insets.top + insets.bottom)},
        styles.screen,
        AnimateMediaTop,
      ]}>
      <Row style={styles.row}>
        <View style={styles.doneContainer}>
          <TouchableWithoutFeedback
            onPress={() => context.media.set(undefined)}>
            <P suppressHighlighting={true}>Done</P>
          </TouchableWithoutFeedback>
        </View>
      </Row>
      <View style={styles.imageContainer}>{media.current}</View>
    </Animated.View>
  );
};

export default MediaView;

export const MediaImageElement: FC<{
  source: ImageSourcePropType;
  aspectRatio: number;
}> = ({source, aspectRatio}) => {
  return (
    <Image
      source={source}
      style={[
        styles.image,
        {
          aspectRatio: aspectRatio,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  doneContainer: {marginStart: 'auto'},
  imageContainer: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  row: {
    flexGrow: 0,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    paddingVertical: theme.spacing.p1,
    paddingHorizontal: theme.spacing.p1,
  },
  image: {
    margin: theme.spacing.p2,
    height: undefined,
    width: '80%',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  screen: {
    zIndex: 4,
    position: 'absolute',
    backgroundColor: '#f1f1f1',
    width: '100%',
  },
});
