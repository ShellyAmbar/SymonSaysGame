import { TextStyle, ViewStyle } from 'react-native';
import { ItemData } from './drop-item/interfaces';

type DropDownProps = {
  containerStyle?: ViewStyle;
  iconColor?: string;
  list: ItemData[];
  onSelectItem: (selectedIndex: number) => void;
  selectedTextStyle?: TextStyle;
  itemTextStyle?: TextStyle;
  selectedItemName?: string;
  onDeleteItem: (selectedId: string) => void;
};

export default DropDownProps;
