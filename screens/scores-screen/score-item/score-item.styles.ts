import { StyleSheet } from 'react-native';
import { GlobalColors } from '../../../assets/styles/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.Brand.secondary,

    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 70,
    flexDirection: 'row',

    paddingHorizontal: 20,
    width: '100%',
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    color: GlobalColors.TextColors.white,
    fontFamily: 'Silkscreen-Regular',
  },
  subTitle: {
    fontSize: 18,
    color: GlobalColors.TextColors.white,
  },
  text: {
    fontSize: 16,
    color: GlobalColors.TextColors.white,
  },
});
