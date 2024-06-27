import { Color } from '../../../store/features/colors-sequence/interfaces';

type ButtonProps = {
  button: Color;
  onButtonPressed: (button: Color) => void;
};

export default ButtonProps;
