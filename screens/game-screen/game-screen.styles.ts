import { StyleSheet } from 'react-native';
import { GlobalColors } from '../../assets/styles/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.Brand.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    paddingTop: 20,
  },

  buttonsContainer: {
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  content: {
    justifyContent: 'center',

    flex: 1,
    paddingHorizontal: 10,
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
    fontSize: 50,
    color: GlobalColors.TextColors.white,
    fontFamily: 'Silkscreen-Regular',
    borderRadius: 30,
    padding: 15,
  },
});
