import { GlobalColors } from '../../assets/styles/colors';
import BottomNavigation from '../bottom-navigation';
import CustomDrawerContent from './custon-drawer/custom-drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';

function DrawerNavigation() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="BottomNav"
      screenOptions={{
        drawerStyle: { backgroundColor: 'transparent' },
        headerStyle: { height: 50 },
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 10 },
        drawerStatusBarAnimation: 'fade',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="BottomNav"
        options={{
          headerTitle: '',
          title: 'Game',
          drawerLabelStyle: { color: GlobalColors.TextColors.white },
          headerStyle: { backgroundColor: GlobalColors.Brand.primary },

          headerTintColor: GlobalColors.TextColors.white,
        }}
        component={BottomNavigation}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
