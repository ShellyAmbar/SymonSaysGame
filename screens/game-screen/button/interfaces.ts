import { ViewStyle } from 'react-native';

type ColorButton = {
  name: string;
  id: number;
  ref: any;
  soundWav: any;
};

type ButtonProps = {
  button: ColorButton;
  onButtonPressed: (button: ColorButton) => void;
  style?: ViewStyle;
};

export { ButtonProps, ColorButton };
