import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 0,
  },

  buttonsContainer: {
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  content: {},
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
    color: '#FFF',
    backgroundColor: '#98FB98',
    borderRadius: 30,
    padding: 15,
  },
});
