import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Option from './Option';
import theme from 'themes';
import NoOption from './NoOption';
import {ConversationShowRefs} from '../..';
import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ConversationReducerActionsType} from 'components/apps/Messages/reducers/conversationReducer/types';

const OptionList: FC<
  {
    active: boolean;
    setActive: (active: boolean) => void;
    activeRoute: MessageRouteType | undefined;
    dispatch: (action: ConversationReducerActionsType) => Promise<void>;
    name: CONTACT_NAMES;
  } & ConversationShowRefs
> = ({
  active,
  setActive,
  activeRoute,
  animatedScrollRef,
  dispatch,
  footerHeight,
  name,
}) => {
  const showOptions = useSharedValue(0);

  const [optionsHeight, setOptionsHeight] = useState(0);

  const {width} = useWindowDimensions();

  useEffect(() => {
    if (active) {
      showOptions.value = withDelay(50, withTiming(1, {duration: 300}));
    } else {
      showOptions.value = withDelay(50, withTiming(0, {duration: 300}));
    }
  }, [active, showOptions]);

  const scrollToEnd = useCallback(() => {
    if (animatedScrollRef.current) {
      animatedScrollRef.current.scrollToEnd({animated: true});
    }
  }, [animatedScrollRef]);

  useEffect(() => {
    if (active) {
      footerHeight.value = withTiming(
        optionsHeight,
        {duration: 100},
        finished => {
          if (finished) {
            runOnJS(scrollToEnd)();
          }
        },
      );
    } else {
      footerHeight.value = withDelay(50, withTiming(0, {duration: 300}));
    }
  }, [active, footerHeight, scrollToEnd, optionsHeight]);

  const animateOptionsUp = useAnimatedStyle(() => {
    return {
      height: interpolate(showOptions.value, [0, 1], [0, optionsHeight]),
    };
  }, [showOptions, active]);

  const options = useMemo(() => {
    if (activeRoute != null) {
      return activeRoute.options.map(option => (
        <Option
          key={`${activeRoute.routes.id}-${option}`}
          id={activeRoute.id}
          option={option}
          setActive={setActive}
          dispatch={dispatch}
          name={name}
        />
      ));
    } else {
      return <NoOption setActive={setActive} />;
    }
  }, [activeRoute, dispatch, name, setActive]);

  return (
    <Animated.View style={[styles.screen, animateOptionsUp]}>
      <View
        style={[
          styles.optionList,
          {
            width: width,
          },
        ]}
        onLayout={(layout: LayoutChangeEvent) => {
          const layoutHeight = layout.nativeEvent.layout.height;
          if (layoutHeight !== Math.round(optionsHeight)) {
            setOptionsHeight(layoutHeight);
          }
        }}>
        {options}
      </View>
    </Animated.View>
  );
};

export default memo(OptionList);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.muted,
    overflow: 'hidden',
    zIndex: 3,
  },
  itemSeparator: {
    height: 1,
    marginVertical: 10,
    backgroundColor: 'gray',
  },
  optionList: {
    position: 'absolute',
  },
});
