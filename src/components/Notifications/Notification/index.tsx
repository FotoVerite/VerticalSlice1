import React, {FC, useEffect} from 'react';
import {formatMoment} from 'common';
import {Bold, P} from 'common/styles/StyledText';
import {Row} from 'common/styles/layout';
import moment from 'moment';
import {View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import {NotificationType} from '../reducers/notificationsReducer/types';
import theme from 'themes';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import pingSound from '../assets/basic-ping.mp3';

const popoverStyle = (popup: boolean) => {
  if (!popup) {
    return {};
  }
  return {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  };
};

const Notification: FC<{
  notification: NotificationType;
  popup?: boolean;
  deactivate?: () => void;
}> = props => {
  const {content, image, timestamp, title, onPress} = props.notification;
  const {width} = useWindowDimensions();

  // Enable playback in silence mode
  Sound.setCategory('Playback');

  useEffect(() => {
    if (props.popup) {
      const ping = new Sound(pingSound, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }

        // Play the sound with an onEnd callback
        // ping.play(success => {
        //   if (success) {
        //     ping.release();
        //   } else {
        //     ping.release();
        //   }
        // });
      });
      return () => {
        ping.release();
      };
    }
  }, [props.popup]);

  const backgroundColor = () => {
    if (!props.popup) {
      ('#b2b0b092');
    }
    return props.notification.backgroundColor || '#dbdbd9';
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (onPress && props.popup && props.deactivate) {
          onPress();
          props.deactivate();
        }
      }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor(),
            width: width - theme.spacing.p4,
          },
          popoverStyle(props.popup),
        ]}>
        <Row>
          <Image source={image} style={styles.image} />
          <View style={styles.contentContainer}>
            <Row style={styles.header}>
              <View style={styles.content}>
                <Bold style={styles.text} numberOfLines={1}>
                  {title}
                </Bold>
                <P style={styles.text}>{content}</P>
              </View>
              <P style={styles.date}>{formatMoment(moment(timestamp))}</P>
            </Row>
          </View>
        </Row>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: '#b2b0b092',
    padding: theme.spacing.p1,
    borderColor: '#b2b0b092',
    borderWidth: 1,

    elevation: 5,
  },
  contentContainer: {
    flexGrow: 1,
    width: 2,
  },
  content: {
    flexShrink: 1,
    marginEnd: theme.spacing.p1,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 8,
    marginEnd: theme.spacing.p1,
  },
  header: {
    alignItems: 'flex-start',
  },
  date: {
    marginLeft: 'auto',
    marginTop: -1,
    color: '#343434',
    fontSize: 13,
  },
  text: {
    color: '#343434',
    fontSize: 13,
  },
});
