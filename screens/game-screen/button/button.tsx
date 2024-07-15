import { Animated, TouchableWithoutFeedback } from 'react-native';
import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import { ButtonProps } from './interfaces';
import Styles from './button.styles';
import SoundPlayer from 'react-native-sound-player';

const Button = memo(
  forwardRef(
    (
      { onButtonPressed, button, style, disabled, ...props }: ButtonProps,
      ref: any
    ) => {
      useImperativeHandle(ref, () => ({
        simulateButtonPress: () => {
          pressInAndOut();
          try {
            SoundPlayer.playAsset(button.soundWav);
          } catch (e) {
            console.log(e);
          }
        },
      }));

      const scaleValue = useRef(new Animated.Value(1)).current;
      const pressInAndOut = () => {
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 0.8,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      };

      const onPressIn = () => {
        Animated.timing(scaleValue, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }).start();
      };

      const onPressOut = () => {
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 200,
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
              try {
                SoundPlayer.playAsset(button.soundWav);
              } catch (e) {
                console.log(e);
              }
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
