import { GlobalColors } from '../../assets/styles/colors';
import BottomNavigation from '../bottom-navigation';
import CustomDrawerContent from './custon-drawer/custom-drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';

function DrawerNavigation() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: 'transparent' },
        headerStyle: { height: 50 },
        drawerItemStyle: { padding: 15 },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="BottomNav"
        options={{
          title: '',
          headerStyle: {
            backgroundColor: GlobalColors.Brand.primary,
            elevation: 0,
          },
          headerTintColor: GlobalColors.TextColors.white,
        }}
        component={BottomNavigation}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
