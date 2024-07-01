import React from 'react';

import GameScreen from '../screens/game-screen/game-screen';
import ScoresScreen from '../screens/scores-screen/scores-screen';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { GlobalColors } from '../assets/styles/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const BottomNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <IconEntypo
              name="game-controller"
              size={30}
              color={
                focused
                  ? GlobalColors.Brand.primary
                  : GlobalColors.TextColors.secondary
              }
            />
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
            <IconMaterial
              name="sports-score"
              size={30}
              color={
                focused
                  ? GlobalColors.Brand.primary
                  : GlobalColors.TextColors.secondary
              }
            />
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
