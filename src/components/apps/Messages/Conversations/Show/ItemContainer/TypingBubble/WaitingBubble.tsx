import React, {FC} from 'react';
import {Image, View} from 'react-native';

import {
  Canvas,
  Group,
  LinearGradient,
  Rect,
  vec,
} from '@shopify/react-native-skia';

import Animated, {SharedValue} from 'react-native-reanimated';
import {Row} from 'components/common/layout';
import {StyleSheet} from 'react-native';
import {DigestedConversationStringItemType} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

import theme from 'themes';
import {P} from 'components/common/StyledText';
import {useHeightDeterminedGradient} from '../hooks/useHeightDeterminedGradient';
import {Dot} from './Dot';
import {
  BubblePath,
  flipPath,
} from 'components/apps/Messages/reducers/conversationReducer/digestion/BubblePath';

export const WaitingBubble: FC<{
  item: DigestedConversationStringItemType;
  scrollHandler: SharedValue<number>;
  scrollRef: React.RefObject<Animated.ScrollView>;
  group?: boolean;
}> = ({item, scrollHandler, group}) => {
  const {avatar, colors, offset, leftSide, name} = item;
  const computedColors = useHeightDeterminedGradient(
    colors,
    offset,
    leftSide,
    scrollHandler,
  );

  const waitingWidth = 75;
  const waitingHeight = 38;
  const clip = BubblePath(waitingWidth, waitingHeight - 5, 12, false);
  flipPath(clip, waitingWidth);

  clip.addCircle(13, 26, 7);
  clip.addCircle(13, 26, 7);
  clip.addCircle(4, 33, 3);

  const dotHeight = (waitingHeight - 2.5) / 2;

  return (
    <Row style={styles.row}>
      {leftSide && (
        <View style={styles.avatarContainer}>
          {avatar && <Image source={avatar} style={styles.avatar} />}
        </View>
      )}
      <View>
        {group && name != 'Self' && (
          <P size="s" style={{marginLeft: 20}}>
            {name}
          </P>
        )}
        <Canvas
          style={{
            width: waitingWidth,
            height: waitingHeight,
          }}>
          <Group clip={clip}>
            <Rect x={0} y={0} width={waitingWidth} height={waitingHeight}>
              <LinearGradient
                colors={computedColors}
                start={vec(0, 0)}
                end={vec(0, waitingHeight)}
              />
            </Rect>
            <Dot height={dotHeight} width={28} delay={0} />
            <Dot
              height={dotHeight}
              width={(waitingWidth + 12) / 2}
              delay={500}
            />
            <Dot height={dotHeight} width={waitingWidth - 15} delay={1000} />
          </Group>
        </Canvas>
      </View>
    </Row>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'flex-end',
    padding: 0,
    margin: 0,
  },
  avatarContainer: {
    width: 30,
    height: 30,
    marginEnd: theme.spacing.p1,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: theme.BorderRadius.normal,
  },
});
