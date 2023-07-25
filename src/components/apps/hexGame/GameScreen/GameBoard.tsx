import React, {FC, useContext} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {HexContext} from '../context';
import Hexagon from './Hexagon';

const GameBoard: FC = () => {
  const {width} = useWindowDimensions();
  const hexCenterLeft = width / 2 - 50;
  const {letters} = useContext(HexContext);
  return (
    <View style={styles.gameBoard}>
      <View
        style={{
          height: 320,
        }}>
        <Hexagon
          colors={['#FFF', '#CCC']}
          letter={letters.state[1]}
          style={{left: hexCenterLeft, zIndex: 8}}
        />
        <Hexagon
          colors={['#FFF', '#CCC']}
          letter={letters.state[2]}
          style={{left: hexCenterLeft - 100, top: 50, zIndex: 7}}
        />
        <Hexagon
          colors={['#FFF', '#CCC']}
          letter={letters.state[0]}
          style={{left: hexCenterLeft + 100, top: 50, zIndex: 6}}
        />
        <Hexagon
          colors={['#f7fb00', '#d9dc1c']}
          letter={letters.state[3]}
          style={{left: hexCenterLeft, top: 110, zIndex: 12}}
        />
        <Hexagon
          colors={['#FFF', '#CCC']}
          letter={letters.state[4]}
          style={{left: hexCenterLeft - 100, top: 160, zIndex: 4}}
        />
        <Hexagon
          colors={['#FFF', '#CCC']}
          letter={letters.state[5]}
          style={{left: hexCenterLeft + 100, top: 160, zIndex: 3}}
        />
        <Hexagon
          colors={['#FFF', '#CCC']}
          letter={letters.state[6]}
          style={{left: hexCenterLeft, top: 220, zIndex: 2}}
        />
      </View>
    </View>
  );
};

export default GameBoard;

const styles = StyleSheet.create({
  gameBoard: {
    flexGrow: 1,
    justifyContent: 'center',
    marginBottom: 120,
  },
});
