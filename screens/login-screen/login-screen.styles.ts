import { StyleSheet } from 'react-native';
import { GlobalColors } from '../../assets/styles/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1,
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    color: GlobalColors.TextColors.white,
    textAlign: 'center',
  },

  input: {
    height: 40,
    margin: 12,
    width: '80%',
    padding: 10,
    borderBottomColor: '#FFFF',
    borderBottomWidth: 3,
    color: GlobalColors.TextColors.white,
  },

  background: {
    zIndex: 0,

    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  grid: {
    justifyContent: 'center',
  },
  playButton: {
    width: '100%',
    height: 200,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
