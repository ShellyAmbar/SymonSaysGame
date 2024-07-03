import { StyleSheet } from 'react-native';
import { GlobalColors } from '../../assets/styles/colors';
export default StyleSheet.create({
  container: {
    flex: 1,

    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },

  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1,
    paddingTop: 24,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  horizontal: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    color: GlobalColors.TextColors.white,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    color: GlobalColors.TextColors.white,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: GlobalColors.TextColors.white,
    textAlign: 'center',
    flex: 1,
  },

  input: {
    width: '80%',
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
    height: 150,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  dropItemText: { color: '#FFFF', fontSize: 18 },
  dropDown: {
    flex: 1,
  },
  errorText: {
    fontSize: 18,
    color: GlobalColors.SystemColors.Error,
    textAlign: 'center',
  },
});
