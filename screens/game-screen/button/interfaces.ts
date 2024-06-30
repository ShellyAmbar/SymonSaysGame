import { ViewStyle } from 'react-native';
import { TouchableOpacityProps } from 'react-native-gesture-handler';

type ColorButton = {
  name: string;
  id: number;
  ref: any;
  soundWav: any;
};

interface ButtonProps extends TouchableOpacityProps {
  button: ColorButton;
  onButtonPressed: (button: ColorButton) => void;
  style?: ViewStyle;
}

export { ButtonProps, ColorButton };
