import { FlatListProps, TextStyle, ViewStyle } from 'react-native';
import { ItemData } from './drop-item/interfaces';

interface DropDownProps extends FlatListProps<any> {
  containerStyle?: ViewStyle;
  iconColor?: string;
  list: ItemData[];
  onSelectItem: (selectedIndex: number) => void;
  selectedTextStyle?: TextStyle;
  itemTextStyle?: TextStyle;
  selectedItemName?: string;
  onDeleteItem: (selectedId: string) => void;
  listStyle?: ViewStyle;
  listContentContainer?: ViewStyle;
  itemContainerStyle?: ViewStyle;
}

export default DropDownProps;
