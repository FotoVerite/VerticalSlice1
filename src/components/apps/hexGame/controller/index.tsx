import {
  SharedValue,
  runOnJS,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {HexContextTypeDigested, HexSharedValuesType} from '../context/types';

export const calculatePoints = (context: HexContextTypeDigested) => {
  const size = context.word.state.length;
  if (size === 4) {
    context.points.set(points => (points += 1));
  } else {
    context.points.set(points => (points += size));
  }
};

export const checkAnswer = (
  context: HexContextTypeDigested,
  sharedValue: HexSharedValuesType,
) => {
  const word = context.word.state;
  const found = context.found;
  const middleWord = context.letters.state[3];
  const answers = context.answers;
  if (context.word.state === '') {
    return;
  } else if (!word.split('').includes(middleWord)) {
    context.notification.set('Word does not include center letter.');
    shakeInput(sharedValue.wordInputShake);
  } else if (found.state.has(word)) {
    context.notification.set('Word already found.');
    shakeInput(sharedValue.wordInputShake);
  } else if (answers.state.has(word.toUpperCase())) {
    calculatePoints(context);
    answers.set(a => {
      a.delete(word.toUpperCase());
      return new Set(a);
    });
    found.set(answered => answered.add(word));
    context.notification.set('Nicely Done');
  } else {
    context.notification.set('Word not found');
    shakeInput(sharedValue.wordInputShake);
  }
};

export const shakeInput = (shake: SharedValue<number>) => {
  shake.value = withTiming(1, {}, finished => {
    if (finished) {
      shake.value = 0;
    }
  });
};

export const showScoreBoard = (context: HexSharedValuesType) => {
  context.infoOpened.value = withTiming(
    context.infoOpened.value === 0 ? 1 : 0,
    {duration: 500},
  );
};

export const showTheNotification = (
  context: HexContextTypeDigested,
  showNotification: SharedValue<number>,
) => {
  showNotification.value = withSequence(
    withTiming(1, {duration: 500}, finished => {
      if (finished) {
        runOnJS(context.word.set)('');
      }
    }),
    withDelay(
      1000,
      withTiming(0, {duration: 500}, finished => {
        if (finished) {
          runOnJS(context.notification.set)('');
        }
      }),
    ),
  );
};
