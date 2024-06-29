import { StyleSheet } from 'react-native';
import { GlobalColors } from '../../assets/styles/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 50,
    color: 'blue',
  },
  subTitle: {
    fontSize: 30,
    color: 'blue',
  },
  text: {
    fontSize: 24,
    color: 'blue',
  },

  input: {
    height: 40,
    margin: 12,
    width: '80%',

    padding: 10,
    borderBottomColor: '#FFFF',
    borderBottomWidth: 1,
    color: GlobalColors.TextColors.white,
  },

  list: {},

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
    position: 'absolute',
    bottom: 30,
  },
});
