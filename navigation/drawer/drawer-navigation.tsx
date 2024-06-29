import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigation from '../bottom-navigation';
import CustomDrawerContent from './custon-drawer/custom-drawer';

function DrawerNavigation() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="BottomNav"
      screenOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 10 },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="BottomNav" component={BottomNavigation} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
