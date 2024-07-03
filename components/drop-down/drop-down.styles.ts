import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  headerContainer: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },

  list: {
    width: '100%',
    flexDirection: 'column',
    paddingStart: 44,
    maxHeight: 200,
    position: 'absolute',
    top: 35,
  },
  selectedText: {
    color: '#FFFF',
    fontSize: 22,
    textAlign: 'center',
  },
});
