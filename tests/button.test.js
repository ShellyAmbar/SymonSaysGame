import Button from '../screens/game-screen/button/button';
import React from 'react';
import renderer from 'react-test-renderer';

test('renders button correctly', () => {
  const button = { name: '', id: 0, ref: null, soundWav: null };
  const tree = renderer.create(<Button button={button} />).toJSON();
  expect(tree).toMatchSnapshot();
});
