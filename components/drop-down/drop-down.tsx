import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Styles from './drop-down.styles';
import Icon from 'react-native-vector-icons/AntDesign';
import DropDownProps from './interfaces';
import DropItem from './drop-item/drop-item';
import { ItemData } from './drop-item/interfaces';
import Spacer from '../spacer/spacer';

const DropDown = ({
  onSelectItem,
  iconColor,
  list,
  selectedTextStyle,
  itemTextStyle,
  containerStyle,
  selectedItemName,
}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getSelectedItemIndexByName = useMemo(() => {
    console.log('getSelectedItemIndexByName list', list);

    const index = list.findIndex(
      item => item.name.toLowerCase() === selectedItemName?.toLowerCase()
    );

    return index;
  }, [list, selectedItemName]);
  const [selectedIndex, setSelectedIndex] = useState(
    selectedItemName && selectedItemName?.length > 0
      ? getSelectedItemIndexByName
      : 0
  );

  useEffect(() => {
    console.log('index', selectedIndex, 'selectedItemName', selectedItemName);
  }, [selectedIndex, selectedItemName]);

  const onItemPressed = useCallback(
    (itemId: string) => {
      setIsOpen(false);
      const index = list.findIndex(item => item.id === itemId);
      console.log('index in onItemPressed ', index, list);

      setSelectedIndex(index);
      onSelectItem(index);
    },
    [onSelectItem, list]
  );
  return (
    <View style={[Styles.container, { ...containerStyle }]}>
      <TouchableOpacity
        style={Styles.headerContainer}
        onPress={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? (
          <Icon name="up" size={20} color={iconColor ? iconColor : 'black'} />
        ) : (
          <Icon name="down" size={20} color={iconColor ? iconColor : 'black'} />
        )}

        <Spacer size={24} isVertical={false} />

        <Text style={[Styles.selectedText, { ...selectedTextStyle }]}>
          {list[selectedIndex]?.name}
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <>
          <FlatList
            style={Styles.list}
            data={list}
            renderItem={({
              item,
              index,
            }: {
              item: ItemData;
              index: number;
            }) => (
              <DropItem
                item={item}
                key={item.id}
                onItemPressed={id => onItemPressed(id)}
                textStyle={itemTextStyle}
              />
            )}
          />
        </>
      )}
    </View>
  );
};

export default DropDown;
