import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/main-screen/main-screen';
import ScoresScreen from '../screens/scores-screen/scores-screen';
export default function MainNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={MainScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Scores"
          component={ScoresScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
