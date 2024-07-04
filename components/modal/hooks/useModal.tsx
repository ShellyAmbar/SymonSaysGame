import { Animated, Dimensions, Platform } from 'react-native';
import React, { useRef } from 'react';
import useModalProps from './interfaces';
import AnimationService from '../../services/animation-service';
import Styles from '../modal.styles';

const useModal = (props: useModalProps) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  let deviceH = Dimensions.get('screen').height;
  let deviceW = Dimensions.get('window').height;
  let diff = deviceH - deviceW;

  const animatSlideDown = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: props.durationEnter,
      useNativeDriver: true,
    }).start(() => {
      props.onClickClose && props.onClickClose();
    });
  };

  const animatSlideUp = height => {
    let finalheight =
      Platform.OS === 'ios'
        ? -height - diff - Styles.content.marginTop
        : -height - diff + Styles.content.marginTop;

    Animated.timing(slideAnim, {
      toValue: finalheight,
      duration: props.durationExit,
      useNativeDriver: true,
    }).start();
  };

  return {
    animatSlideDown,
    animatSlideUp,

    slideAnim,
  };
};

export default useModal;
