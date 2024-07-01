import WithLoading from '../components/with-loading/with-loading';
import React from 'react';
import renderer from 'react-test-renderer';
import { FlatList, Text } from 'react-native';

it('renders withLoading component', () => {
  const ListWithLoading = WithLoading(FlatList);
  const tree = renderer
    .create(
      <ListWithLoading
        style={{}}
        isLoading={true}
        data={['1', '2']}
        renderItem={({ item, index }) => <Text>{item}</Text>}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
