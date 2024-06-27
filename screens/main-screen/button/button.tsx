import { TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import ButtonProps from './interfaces';
import Styles from './button.styles';
const Button = memo(({ onButtonPressed, button }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onButtonPressed(button);
      }}
      key={button.id}
      style={{ ...Styles.button, backgroundColor: button.name }}
    />
  );
});

export default Button;
