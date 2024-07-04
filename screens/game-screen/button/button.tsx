import { TouchableOpacity } from 'react-native';
import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ButtonProps } from './interfaces';
import Styles from './button.styles';
import SoundPlayer from 'react-native-sound-player';

const Button = memo(
  forwardRef(
    (
      { onButtonPressed, button, style, disabled, ...props }: ButtonProps,
      ref: any
    ) => {
      const [buttonOpacity, setButtonOpacity] = useState(1);
      useImperativeHandle(ref, () => ({
        simulateButtonPress: () => {
          SoundPlayer.playAsset(button.soundWav);

          setButtonOpacity(0);
          const timeout = setTimeout(() => {
            setButtonOpacity(1);
            clearTimeout(timeout);
          }, 200);
        },
      }));

      return (
        <TouchableOpacity
          ref={ref}
          // onPressIn={() => setButtonOpacity(0)}
          // onPressOut={() => setButtonOpacity(1)}
          onPress={() => {
            SoundPlayer.playAsset(button.soundWav);
            setButtonOpacity(0);
            const timeout = setTimeout(() => {
              setButtonOpacity(1);
              onButtonPressed && onButtonPressed(button);
              clearTimeout(timeout);
            }, 200);
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
