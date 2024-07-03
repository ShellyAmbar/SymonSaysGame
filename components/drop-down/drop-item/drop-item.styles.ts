import { StyleSheet } from 'react-native';
import { GlobalColors } from '../../../assets/styles/colors';
export default StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  title: {
    color: GlobalColors.TextColors.primary,
    fontSize: 16,
  },
});
