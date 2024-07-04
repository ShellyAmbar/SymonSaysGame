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
    color: GlobalColors.TextColors.white,
    fontSize: 30,
    fontFamily: 'Silkscreen-Bold',
  },
  text: {
    color: GlobalColors.TextColors.white,
    fontSize: 16,
    fontFamily: 'Silkscreen-Regular',
  },
});
