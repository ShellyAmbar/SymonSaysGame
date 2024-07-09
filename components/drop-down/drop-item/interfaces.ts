import { TextStyle, ViewStyle } from 'react-native';

type ItemData = {
  id: string;
  name: string;
};
type DropItemProps = {
  item: ItemData;
  onItemPressed: (itemId: string) => void;
  onDeleteItemPressed: (itemId: string) => void;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
};

export { DropItemProps, ItemData };
