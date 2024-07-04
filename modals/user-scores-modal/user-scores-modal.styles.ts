import { StyleSheet, Dimensions } from 'react-native';
import { GlobalColors } from '../../assets/styles/colors';
export default StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.Brand.primary,
    maxHeight: Dimensions.get('screen').height - 100,
  },
  icon: { color: GlobalColors.TextColors.white },
  title: {
    fontFamily: 'Silkscreen-Bold',
  },
});
