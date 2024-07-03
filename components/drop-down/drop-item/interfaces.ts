import { TextStyle } from 'react-native';

type ItemData = {
  id: string;
  name: string;
};
type DropItemProps = {
  item: ItemData;
  onItemPressed: (itemId: string) => void;
  onDeleteItemPressed: (itemId: string) => void;
  textStyle?: TextStyle;
};

export { DropItemProps, ItemData };
