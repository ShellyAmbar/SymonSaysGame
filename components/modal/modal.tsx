import {
  Animated,
  View,
  Modal,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import ModalProps from './interfaces';
import Styles from './modal.styles';
import useModal from './hooks/useModal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { GlobalColors } from '../../assets/styles/colors';
const ModalView = ({
  isVisible,
  onClickClose,
  title,
  titleStyle,
  durationEnter = 500,
  durationExit = 500,
  children,
  style,
  iconColor,
}: ModalProps) => {
  const { animatSlideDown, animatSlideUp, slideAnim } = useModal({
    onClickClose,
    durationEnter,
    durationExit,
  });

  return (
    <Modal visible={isVisible} transparent onRequestClose={animatSlideDown}>
      <Pressable onPress={() => animatSlideDown()} style={Styles.backdrop} />
      <Animated.View
        onLayout={event => {
          animatSlideUp(event.nativeEvent.layout.height);
        }}
        style={[
          Styles.halfCircularRectView,
          Styles.shadow,
          {
            transform: [
              {
                translateY: slideAnim,
              },
            ],
          },
          { ...style },
        ]}
      >
        <View style={Styles.container}>
          <View style={Styles.top}>
            <View style={Styles.end} />

            {title ? (
              <Text style={{ ...Styles.title, ...titleStyle }}>{title}</Text>
            ) : (
              <View style={Styles.title} />
            )}

            <TouchableOpacity
              onPress={() => {
                animatSlideDown();
              }}
              style={Styles.closeButton}
            >
              <EvilIcons
                name="close"
                size={30}
                color={iconColor ? iconColor : GlobalColors.Brand.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={Styles.content}>{children}</View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default ModalView;
