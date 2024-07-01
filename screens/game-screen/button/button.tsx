import { TouchableOpacity } from 'react-native';
import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';
import { ButtonProps } from './interfaces';
import Styles from './button.styles';
import Sound from 'react-native-sound';
const Button = memo(
  forwardRef(
    (
      { onButtonPressed, button, style, disabled, ...props }: ButtonProps,
      ref: any
    ) => {
      const [buttonOpacity, setButtonOpacity] = useState(1);
      useImperativeHandle(ref, () => ({
        simulateButtonPress: () => {
          button.soundWav?.play();

          setButtonOpacity(0);
          const timeout = setTimeout(() => {
            setButtonOpacity(1);
            clearTimeout(timeout);
          }, 300);
        },
      }));

      return (
        <TouchableOpacity
          ref={ref}
          onPressIn={() => setButtonOpacity(0)}
          onPressOut={() => setButtonOpacity(1)}
          onPress={() => {
            button.soundWav?.play();
            onButtonPressed && onButtonPressed(button);
          }}
          key={button.id}
          style={{
            ...Styles.button,
            ...style,
            backgroundColor: button.name,
            opacity: buttonOpacity,
          }}
          disabled={disabled}
          {...props}
        />
      );
    }
  )
);

export default Button;
