import { StyleSheet } from 'react-native';
import { GlobalColors } from '../../../assets/styles/colors';
export default StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    color: GlobalColors.Brand.primary,
    fontSize: 30,
  },
  text: {
    color: GlobalColors.Brand.secondary,
    fontSize: 24,
  },
});
