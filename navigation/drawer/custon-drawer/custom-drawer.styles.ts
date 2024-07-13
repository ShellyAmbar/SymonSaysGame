import { StyleSheet } from 'react-native';
import { GlobalColors } from '../../../assets/styles/colors';
export default StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  title: {
    color: GlobalColors.TextColors.white,
    fontSize: 22,
    fontFamily: 'Silkscreen-Bold',
    textAlign: 'center',
  },
  text: {
    color: GlobalColors.TextColors.white,
    fontSize: 22,
    fontFamily: 'Silkscreen-Regular',
  },
});
