import BottomNavigation from '../bottom-navigation';
import CustomDrawerContent from './custon-drawer/custom-drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';

function DrawerNavigation() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="BottomNav"
      screenOptions={{
        headerStyle: { height: 50 },
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 10 },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="BottomNav"
        options={{ headerTitle: '', title: 'Game' }}
        component={BottomNavigation}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
