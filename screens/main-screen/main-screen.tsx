import { View, FlatList, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import Styles from './main-screen.styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  resetSequence,
  addColor,
} from '../../store/features/colors-sequence/colors-sequence-slice';
import { Color } from '../../store/features/colors-sequence/interfaces';
import Button from './button/button';

const MainScreen = () => {
  const colorsSequence = useSelector(
    state => state.colorsSequence.colorsSequence
  );
  const dispatch = useDispatch();
  const [buttons, setButtons] = useState<Color[]>([
    { id: 0, name: 'blue' },
    { id: 1, name: 'green' },
    { id: 2, name: 'red' },
    { id: 3, name: 'yellow' },
  ]);
  const onButtonPressed = useCallback(
    (button: Color) => {
      dispatch(addColor(button));
    },
    [dispatch]
  );

  return (
    <View style={Styles.container}>
      <FlatList
        style={Styles.buttonsContainer}
        numColumns={2}
        data={buttons}
        renderItem={({ item, index }) => (
          <Button button={item} onButtonPressed={onButtonPressed} />
        )}
      />
    </View>
  );
};

export default MainScreen;
