import {P} from 'common/styles/StyledText';
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from 'components/apps/Messages/reducers/conversationReducer/types';
import React, {FC} from 'react';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';

import theme from 'themes';

const Footer: FC<{
  dispatch: (action: ConversationReducerActionsType) => void;
  footerHeight: SharedValue<number>;
}> = ({dispatch, footerHeight}) => {
  const animatedMargin = useAnimatedStyle(() => {
    return {
      marginBottom: theme.spacing.p2 + 50,
    };
  });
  return (
    <Animated.View style={animatedMargin}>
      {__DEV__ && (
        <TouchableHighlight
          onPress={() =>
            dispatch({type: CONVERSATION_REDUCER_ACTIONS.SKIP_ROUTE})
          }>
          <P style={{textAlign: 'right'}}>skip conversation</P>
        </TouchableHighlight>
      )}
    </Animated.View>
  );
};

export default Footer;
