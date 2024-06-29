import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GameScreen from '../screens/game-screen/game-screen';
import ScoresScreen from '../screens/scores-screen/scores-screen';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { GlobalColors } from '../assets/styles/colors';
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
              color={GlobalColors.Brand.primary}
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
              color={GlobalColors.Brand.primary}
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
