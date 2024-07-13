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
  onDeleteItem,
  listStyle,
  listContentContainer,
  itemContainerStyle,
  renderItem,
  data,
  placeHolderText = '',
  ...props
}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getSelectedItemIndexByName = useMemo(() => {
    const index = list.findIndex(
      item => item.name.toLowerCase() === selectedItemName?.toLowerCase()
    );

    return index;
  }, [list, selectedItemName]);
  const [selectedIndex, setSelectedIndex] = useState(
    selectedItemName && selectedItemName?.length > 0
      ? getSelectedItemIndexByName
      : -1
  );

  const onItemPressed = useCallback(
    (itemId: string) => {
      setIsOpen(false);
      const index = list.findIndex(item => item.id === itemId);

      setSelectedIndex(index);
      onSelectItem(index);
    },
    [onSelectItem, list]
  );

  return (
    <View style={[Styles.container]}>
      <TouchableOpacity
        style={[Styles.headerContainer, { ...containerStyle }]}
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
          {placeHolderText}
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <>
          <Spacer size={12} />
          <FlatList
            ItemSeparatorComponent={() => <Spacer isVertical size={10} />}
            style={[Styles.list, { ...listStyle }]}
            contentContainerStyle={[
              Styles.contentContainerList,
              { ...listContentContainer },
            ]}
            data={list}
            renderItem={
              renderItem
                ? renderItem
                : ({ item, index }: { item: ItemData; index: number }) => (
                    <DropItem
                      onDeleteItemPressed={id => onDeleteItem(id)}
                      item={item}
                      key={item.id}
                      onItemPressed={id => onItemPressed(id)}
                      textStyle={itemTextStyle}
                      containerStyle={itemContainerStyle}
                    />
                  )
            }
            {...props}
          />
        </>
      )}
    </View>
  );
};

export default DropDown;
