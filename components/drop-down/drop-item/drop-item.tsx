import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { DropItemProps } from './interfaces';
import Styles from './drop-item.styles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { GlobalColors } from '../../../assets/styles/colors';
const DropItem = ({
  item,
  onItemPressed,
  textStyle,
  onDeleteItemPressed,
  containerStyle,
}: DropItemProps) => {
  return (
    <View style={[Styles.container, { ...containerStyle }]}>
      <TouchableOpacity
        onPress={() => {
          onDeleteItemPressed(item.id);
        }}
        style={Styles.closeButton}
      >
        <EvilIcons name="close" size={30} color={GlobalColors.buttonColors} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onItemPressed(item.id)}
        style={Styles.titleContainer}
      >
        <Text style={[Styles.title, { ...textStyle }]}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DropItem;
