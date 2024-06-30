import { View, Text, FlatList } from 'react-native';
import React, { memo, useCallback, useEffect, useState } from 'react';
import Styles from './scores-screen.styles';
import { useSelector } from 'react-redux';
import WithLoading from '../../components/with-loading/with-loading';
import ScoreItem from './score-item/score-item';
import Spacer from '../../components/spacer/spacer';
const ListWithLoading = WithLoading(FlatList);
const ScoresScreen = memo(() => {
  const { userName } = useSelector(state => state.game);
  const { results } = useSelector(state => state.results);
  const [sortedListOfResults, setSortedListOfResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  }, [sortResultsByTopScore, results]);

  useEffect(() => {
    if (sortedListOfResults?.length === 0) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
        clearTimeout(timeout);
      }, 1500);
    }
  }, [sortedListOfResults]);
  const itemSeperator = () => <View style={{ height: 10 }} />;

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Top scores</Text>
      <Spacer size={16} />
      <ListWithLoading
        style={Styles.list}
        contentContainerStyle={Styles.content}
        isLoading={isLoading}
        data={sortedListOfResults}
        renderItem={({ item, index }) => (
          <ScoreItem key={item.id} data={item} />
        )}
        keyExtractor={(item, index) => item.dateCreated.toString()}
        ItemSeparatorComponent={itemSeperator}
      />
    </View>
  );
});

export default ScoresScreen;
