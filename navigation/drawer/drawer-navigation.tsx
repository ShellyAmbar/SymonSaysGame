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
        activeTintColor: '#FFF',
        itemStyle: { marginVertical: 10 },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="BottomNav"
        options={{
          drawerLabel: () => null,
          headerTitle: '',
          title: '',
          drawerLabelStyle: {
            color: GlobalColors.TextColors.white,
            fontFamily: 'Silkscreen-Bold',
          },
          headerStyle: { backgroundColor: GlobalColors.Brand.primary },

          headerTintColor: GlobalColors.TextColors.white,
        }}
        component={BottomNavigation}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
