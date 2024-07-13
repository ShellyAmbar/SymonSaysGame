import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import Styles from './login-screen.styles';
import Rectangle from './rectangle/rectangle';
import Spacer from '../../components/spacer/spacer';
import DropDown from '../../components/drop-down/drop-down';
import useLoginScreen from './hooks/useLoginScreen';
import { BlurView } from '@react-native-community/blur';
import BouncingButton from '../../components/animated-view/animated-view';
const LoginScreen = props => {
  const {
    userName,
    startGame,
    onChangeText,
    text,
    players,
    errorMessage,
    rects,
    deleteUser,
  } = useLoginScreen(props);
  return (
    <View style={Styles.container}>
      <FlatList
        style={Styles.background}
        data={rects}
        renderItem={({ item }) => (
          <Rectangle key={item.id} color={item.color} ref={item.ref} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={Styles.grid}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={Styles.circularView}>
            <BlurView
              style={Styles.absolute}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            />

            <View style={Styles.content}>
              <Spacer size={24} />
              <Text style={Styles.title}>{'Simon Says'}</Text>
              <Spacer size={54} />

              <TextInput
                style={Styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder={
                  players?.length > 0 && userName?.length > 0
                    ? userName
                    : 'Enter your nickname'
                }
                placeholderTextColor={'#FFFF'}
              />
              <Spacer size={8} />
              {errorMessage?.length > 0 && (
                <>
                  <Spacer size={8} />
                  <Text style={Styles.errorText}>{errorMessage}</Text>
                  <Spacer size={18} />
                </>
              )}
            </View>

            <Spacer size={8} />
            {players?.length > 0 && (
              <>
                <Text style={Styles.subTitle}>OR</Text>
                <Spacer size={18} />
                <DropDown
                  placeHolderText={'Select from the list'}
                  onDeleteItem={id => deleteUser(id)}
                  list={players}
                  onSelectItem={itemIndex => {
                    onChangeText(players[itemIndex].name);
                  }}
                  iconColor="#FFFF"
                  itemTextStyle={Styles.dropItemText}
                  itemContainerStyle={Styles.itemContainerStyle}
                  containerStyle={Styles.dropDown}
                  listStyle={Styles.dropDownList}
                  listContentContainer={Styles.dropDownContainer}
                  selectedItemName={''}
                  selectedTextStyle={Styles.text}
                  data={null}
                  renderItem={null}
                />
              </>
            )}
            <Spacer size={58} />

            <BouncingButton style={Styles.playButton}>
              <TouchableOpacity onPress={() => startGame()}>
                <Text style={Styles.playButtonText}>{'Play'}</Text>
              </TouchableOpacity>
            </BouncingButton>
            <Spacer size={18} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
