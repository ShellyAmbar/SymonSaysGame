import { StyleSheet } from 'react-native';
import { GlobalColors } from '../../../assets/styles/colors';
export default StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 10,
    paddingVertical: 10,
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: GlobalColors.TextColors.primary,
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
  closeButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
