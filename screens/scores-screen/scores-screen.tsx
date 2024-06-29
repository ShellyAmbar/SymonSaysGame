import { View, Text, FlatList } from 'react-native';
import React, { memo, useCallback, useEffect, useState } from 'react';
import Styles from './scores-screen.styles';
import { useSelector } from 'react-redux';
import WithLoading from '../../components/with-loading/with-loading';
const ListWithLoading = WithLoading(FlatList);
const ScoresScreen = memo(() => {
  const { userName } = useSelector(state => state.game);
  const { results } = useSelector(state => state.results);
  const [sortedListOfResults, setSortedListOfResults] = useState([]);
  const sortResultsByTopScore = useCallback(() => {
    const playerResults = results.filter(
      result => result.userName === userName
    );
    const sortedResults = playerResults.sort((a, b) => a.level - b.level);
    console.log('sortedResults ', sortedResults);
    setSortedListOfResults(sortedResults);
  }, [results, userName]);

  useEffect(() => {
    sortResultsByTopScore();
  }, [sortResultsByTopScore]);

  return (
    <View style={Styles.container}>
      <Text>Top scores</Text>
      <ListWithLoading
        isLoading={sortedListOfResults?.length > 0}
        data={sortedListOfResults}
        renderItem={() => <></>}
      />
    </View>
  );
});

export default ScoresScreen;
