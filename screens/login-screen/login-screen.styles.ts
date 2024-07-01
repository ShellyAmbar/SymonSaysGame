import { StyleSheet } from 'react-native';
import { GlobalColors } from '../../assets/styles/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '100%',
    // height: '100%',
    // paddingHorizontal: 20,
  },
  inner: {
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
  },
  subTitle: {
    fontSize: 30,
    color: GlobalColors.TextColors.white,
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
    borderBottomWidth: 3,
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
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
