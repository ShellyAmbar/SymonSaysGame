import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Styles from './custom-drawer.styles';
import Spacer from '../../../components/spacer/spacer';

const CustomDrawerContent = props => {
  const { userName } = useSelector(state => state.game);
  return (
    <DrawerContentScrollView {...props}>
      <Spacer size={20} />
      <View style={Styles.header}>
        <Text style={Styles.title}>{`Hey ${userName}`}</Text>
      </View>
      <Spacer size={20} />
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => props.navigation.replace('Login')}
      />
    </DrawerContentScrollView>
  );
};
export default CustomDrawerContent;
