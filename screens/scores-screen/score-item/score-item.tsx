import { View, Text } from 'react-native';
import React, { memo } from 'react';
import Styles from './score-item.styles';
import ScoreItemProps from './interfaces';

const ScoreItem = memo(({ data }: ScoreItemProps) => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>{data.userName}</Text>
      <Text style={Styles.title}>{data.level}</Text>
    </View>
  );
});

export default ScoreItem;
