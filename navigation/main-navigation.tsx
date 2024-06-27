import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/main-screen/main-screen';
import ScoresScreen from '../screens/scores-screen/scores-screen';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="Home" component={ScoresScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
