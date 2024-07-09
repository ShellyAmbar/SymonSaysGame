import { Animated, TouchableWithoutFeedback } from 'react-native';
import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import { ButtonProps } from './interfaces';
import Styles from './button.styles';
import SoundPlayer from 'react-native-sound-player';
import { promiseTimeout } from '../../../utils/hooks/promises';

const Button = memo(
  forwardRef(
    (
      { onButtonPressed, button, style, disabled, ...props }: ButtonProps,
      ref: any
    ) => {
      useImperativeHandle(ref, () => ({
        simulateButtonPress: async () =>
          new Promise<void>(async (resolve, reject) => {
            SoundPlayer.playAsset(button.soundWav);
            onPressIn();
            const timeout = setTimeout(() => {
              onPressOut();
              clearTimeout(timeout);
              resolve();
            }, 300);
          }),
      }));

      const scaleValue = useRef(new Animated.Value(1)).current;

      const onPressIn = () => {
        Animated.spring(scaleValue, {
          toValue: 0.8,
          useNativeDriver: true,
        }).start();
      };

      const onPressOut = () => {
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }).start();
      };

      return (
        <>
          <TouchableWithoutFeedback
            ref={ref}
            onPressIn={() => onPressIn()}
            onPressOut={() => onPressOut()}
            onPress={() => {
              SoundPlayer.playAsset(button.soundWav);
              onButtonPressed && onButtonPressed(button);
            }}
            key={button.id}
            disabled={disabled}
            {...props}
          >
            <Animated.View
              style={[
                {
                  ...Styles.button,
                  ...style,
                  backgroundColor: button.name,
                },
                { transform: [{ scale: scaleValue }] },
              ]}
            />
          </TouchableWithoutFeedback>
        </>
      );
    }
  )
);

export default Button;
