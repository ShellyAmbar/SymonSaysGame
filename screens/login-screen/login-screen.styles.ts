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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    padding: 20,
    flex: 1,
  },
  horizontal: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 45,
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
    fontSize: 16,
    color: GlobalColors.TextColors.white,
    textAlign: 'center',
    flex: 1,
    fontFamily: 'Silkscreen-Regular',
  },

  input: {
    width: '90%',
    borderBottomColor: '#FFFF',
    borderBottomWidth: 3,
    color: GlobalColors.TextColors.white,
    fontFamily: 'Silkscreen-Regular',
    paddingVertical: 5,
    fontSize: 18,
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
  grid: {
    justifyContent: 'center',
  },
  playButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
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
    paddingVertical: 5,
  },
  dropDown: {
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 30,
    padding: 10,
  },
  dropDownList: {
    maxHeight: 80,
    borderWidth: 1,
  },
  dropDownContainer: {
    paddingBottom: 50,
  },
  errorText: {
    fontSize: 18,
    color: GlobalColors.SystemColors.Error,
    textAlign: 'center',
    fontFamily: 'Silkscreen-Regular',
  },
});
