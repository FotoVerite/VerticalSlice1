import React, {FC, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import theme from 'themes';
import {Row} from 'common/styles/layout';
import ChevronButton, {MESSAGE_SEND_BUTTON_STATE} from '../ChevronButton';
import DisplayedText, {DISPLAYED_TEXT_STATES} from '../DIsplayedText';

const SingleOptionDisplay: FC<{
  text?: string;
  cb: () => Promise<void>;
}> = ({cb, text}) => {
  const sent = useRef(false);
  const [textState, setTextState] = useState(DISPLAYED_TEXT_STATES.DISPLAYED);
  const [buttonState, setButtonState] = useState(
    text != null
      ? MESSAGE_SEND_BUTTON_STATE.SENDABLE
      : MESSAGE_SEND_BUTTON_STATE.INACTIVE,
  );

  useEffect(() => {
    setTextState(DISPLAYED_TEXT_STATES.DISPLAYED);
    if (text != null) {
      setButtonState(MESSAGE_SEND_BUTTON_STATE.SENDABLE);
    } else {
      setButtonState(MESSAGE_SEND_BUTTON_STATE.INACTIVE);
    }
  }, [text]);

  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (!sent.current) {
            sent.current = true;
            setTextState(DISPLAYED_TEXT_STATES.SENT);
          }
        }}>
        <View style={[styles.textInput]}>
          <Row>
            {text ? (
              <DisplayedText text={text} state={textState} cb={cb} />
            ) : (
              <View style={{flexGrow: 1}} />
            )}
            <View>
              <ChevronButton state={buttonState} />
            </View>
          </Row>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SingleOptionDisplay;

const styles = StyleSheet.create({
  container: {
    zIndex: 4,
    justifyContent: 'center',
  },
  textInput: {
    borderColor: '#cfcdcd',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: theme.spacing.p1,
    alignItems: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
    marginBottom: 2,
    backgroundColor: '#ffffffd8',
  },
});
