import { StyleSheet } from 'react-native';
import { GlobalColors } from '../../../assets/styles/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.4)',

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
