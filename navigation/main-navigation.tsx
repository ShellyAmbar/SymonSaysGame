import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './drawer/drawer-navigation';
import LoginScreen from '../screens/login-screen/login-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function MainNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={DrawerNavigation}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
