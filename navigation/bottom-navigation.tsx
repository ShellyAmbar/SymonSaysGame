import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GameScreen from '../screens/game-screen/game-screen';
import ScoresScreen from '../screens/scores-screen/scores-screen';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
const BottomNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <IconFontAwesome name="home" size={30} color="blue" />
          ),
          tabBarShowLabel: false,
        }}
        name="Game"
        component={GameScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <IconMaterial name="sports-score" size={30} color="blue" />
          ),
          tabBarShowLabel: false,
        }}
        name="Scores"
        component={ScoresScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
