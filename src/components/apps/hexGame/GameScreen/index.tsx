import React, {FC} from 'react';
import WordDisplay from './WordDisplay/Word';
import GameBoard from './GameBoard';
import HexControl from './Controls';
const GameScreen: FC = () => {
  return (
    <>
      <WordDisplay />
      <GameBoard />
      <HexControl />
    </>
  );
};

export default GameScreen;
