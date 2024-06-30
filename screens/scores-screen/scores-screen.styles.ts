import { StyleSheet } from 'react-native';
import { GlobalColors } from '../../assets/styles/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.Brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: GlobalColors.TextColors.white,
  },
  subTitle: {
    fontSize: 18,
    color: GlobalColors.TextColors.primary,
  },
  text: {
    fontSize: 16,
    color: GlobalColors.TextColors.primary,
  },
  list: {
    width: '100%',
  },
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
