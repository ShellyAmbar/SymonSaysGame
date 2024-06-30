import { StyleSheet } from 'react-native';
import { GlobalColors } from '../../assets/styles/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonsContainer: {
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  content: {
    justifyContent: 'space-between',
  },
  lottie: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,

    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
  },
  nextLevelText: {
    fontSize: 30,
    color: GlobalColors.Brand.primary,

    borderRadius: 30,
    padding: 15,
  },
});
