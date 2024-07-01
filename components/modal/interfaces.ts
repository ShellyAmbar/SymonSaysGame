import { TextStyle, ViewProps, ViewStyle } from 'react-native';

export default interface ModalProps extends ViewProps {
  isVisible: boolean;
  onBackdropPress?: () => void;
  title?: string;
  titleStyle?: TextStyle[] | TextStyle;

  onPressProcceed?: () => void;
  durationEnter?: number;
  durationExit?: number;
  valueEnter?: number;
  valueExit?: number;
  startValue?: number;
  onClickClose: () => void;
  style?: ViewStyle;
  iconColor?: string;
}
