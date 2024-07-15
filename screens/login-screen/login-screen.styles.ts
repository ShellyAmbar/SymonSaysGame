import { StyleSheet } from 'react-native';
import { GlobalColors } from '../../assets/styles/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
  },
  circularView: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 30,
    padding: 20,
    justifyContent: 'space-between',
  },

  content: {
    zIndex: 1,

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
    fontFamily: 'Silkscreen-Bold',
    width: '100%',
  },
  subTitle: {
    fontSize: 18,
    color: GlobalColors.TextColors.white,
    textAlign: 'center',
    fontFamily: 'Silkscreen-Regular',
  },
  text: {
    fontSize: 14,
    color: GlobalColors.TextColors.white,
    textAlign: 'center',
    flex: 1,
    fontFamily: 'Silkscreen-Regular',
  },

  input: {
    width: '100%',
    borderBottomColor: '#FFFF',
    borderBottomWidth: 3,
    color: GlobalColors.TextColors.white,
    fontFamily: 'Silkscreen-Regular',
    paddingVertical: 5,
    fontSize: 16,
    textAlign: 'center',
  },

  background: {
    zIndex: 0,

    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 30,
  },
  grid: {
    justifyContent: 'center',
  },
  playButton: {
    width: '100%',
    alignItems: 'center',
    zIndex: 4,
  },
  playButtonText: {
    color: '#FFFF',
    fontSize: 36,
    fontFamily: 'Silkscreen-Regular',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  dropItemText: {
    color: '#FFFF',
    fontSize: 16,
    fontFamily: 'Silkscreen-Regular',
  },
  itemContainerStyle: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropDown: {
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 30,
    padding: 10,
  },
  dropDownList: {
    maxHeight: 100,
    // borderWidth: 1,
    // borderColor: '#FFF',
  },
  dropDownContainer: {
    paddingBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: GlobalColors.SystemColors.Error,
    textAlign: 'center',
    fontFamily: 'Silkscreen-Regular',
  },
});
