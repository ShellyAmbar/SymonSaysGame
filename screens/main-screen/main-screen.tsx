import { View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Styles from './main-screen.styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  resetSequence,
  addColor,
} from '../../store/features/colors-sequence/colors-sequence-slice';
import { Color } from '../../store/features/colors-sequence/interfaces';

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
  const onButtonPressed = (button: Color) => {
    dispatch(addColor(button));
  };

  return (
    <View style={Styles.container}>
      <FlatList
        style={Styles.buttonsContainer}
        numColumns={2}
        data={buttons}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              onButtonPressed(item);
            }}
            key={item.id}
            style={{ ...Styles.button, backgroundColor: item.name }}
          />
        )}
      />
    </View>
  );
};

export default MainScreen;
