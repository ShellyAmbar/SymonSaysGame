import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { DropItemProps } from './interfaces';
import Styles from './drop-item.styles';

const DropItem = ({ item, onItemPressed, textStyle }: DropItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => onItemPressed(item.id)}
      style={Styles.container}
    >
      <Text style={[Styles.title, { ...textStyle }]}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default DropItem;
