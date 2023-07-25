import React, {FC, useState} from 'react';
import {HexContextTypeDigested, HexContextTypeDigest} from './types';

//defaults for empty app
export const HexContext = React.createContext<HexContextTypeDigested>({});

const HexContextProvider: FC<HexContextTypeDigest> = props => {
  const [answers, setAnswers] = useState(
    new Set(props.answers.map(w => w.toUpperCase())),
  );
  const [found, setFound] = useState(new Set(props.found));
  const [notification, setNotification] = useState('');

  const [letters, setLetters] = useState(props.letters);
  const [points, setPoints] = useState(props.points);
  const [word, setWord] = useState('');

  return (
    <HexContext.Provider
      value={{
        answers: {state: answers, set: setAnswers},
        found: {state: found, set: setFound},
        letters: {state: letters, set: setLetters},
        notification: {state: notification, set: setNotification},
        points: {state: points, set: setPoints},
        word: {state: word, set: setWord},
      }}>
      {props.children}
    </HexContext.Provider>
  );
};

export default HexContextProvider;
export const HexContextConsumer = HexContext.Consumer;
