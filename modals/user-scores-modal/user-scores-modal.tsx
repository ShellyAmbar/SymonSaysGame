import React from 'react';
import ModalView from '../../components/modal/modal';
import UserScoresModalProps from './interfaces';
import ScoresScreen from '../../screens/scores-screen/scores-screen';
import Styles from './user-scores-modal.styles';
const UserScoresModal = ({
  isModalVisible,
  onBackdropPress,
  onClickClose,
}: UserScoresModalProps) => {
  return (
    <ModalView
      iconColor={Styles.icon.color}
      style={Styles.container}
      onClickClose={onClickClose}
      onBackdropPress={onBackdropPress}
      isVisible={isModalVisible}
    >
      <ScoresScreen />
    </ModalView>
  );
};

export default UserScoresModal;
