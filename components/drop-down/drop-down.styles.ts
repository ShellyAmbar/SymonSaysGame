import { StyleSheet } from 'react-native';
import { GlobalColors } from '../../assets/styles/colors';

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
    position: 'absolute',
    top: 35,
    borderWidth: 1,
    borderColor: GlobalColors.TextColors.white,
    padding: 5,
  },
  contentContainerList: {
    paddingBottom: 50,
  },
  selectedText: {
    color: '#FFFF',
    fontSize: 22,
    textAlign: 'center',
  },
});
