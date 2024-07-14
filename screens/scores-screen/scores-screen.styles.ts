import { StyleSheet } from 'react-native';
import { GlobalColors } from '../../assets/styles/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.Brand.primary,

    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: GlobalColors.TextColors.white,
    fontFamily: 'Silkscreen-Bold',
  },
  subTitle: {
    fontSize: 18,
    color: GlobalColors.TextColors.white,
    fontFamily: 'Silkscreen-Regular',
  },
  text: {
    fontSize: 16,
    color: GlobalColors.TextColors.primary,
    fontFamily: 'Silkscreen-Regular',
  },
  list: {
    width: '100%',
    minHeight: 400,
    maxHeight: '50%',
  },
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
});
