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
    <DrawerContentScrollView
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      {...props}
    >
      <Spacer size={20} />
      <View style={Styles.header}>
        <Text style={Styles.title}>{`Hey\n${userName}`}</Text>
      </View>
      <Spacer size={20} />

      <DrawerItem
        labelStyle={Styles.text}
        label="Logout"
        onPress={() => props.navigation.replace('Login')}
      />
    </DrawerContentScrollView>
  );
};
export default CustomDrawerContent;
