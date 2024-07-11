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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Styles from './login-screen.styles';
import Rectangle from './rectangle/rectangle';
import { Rect } from './interfaces';
import {
  setUserName,
  addPlayer,
  removePlayer,
} from '../../store/features/game/game-slice';
import { deleteResult } from '../../store/features/results/results-slice';
import { useDispatch, useSelector } from 'react-redux';
import Spacer from '../../components/spacer/spacer';
import LottieView from 'lottie-react-native';
import { GlobalColors } from '../../assets/styles/colors';
import DropDown from '../../components/drop-down/drop-down';
import useSounds from '../../utils/hooks/useSounds';
import SoundPlayer from 'react-native-sound-player';
import useLoginScreen from './hooks/useLoginScreen';

const LoginScreen = props => {
  const {
    userName,
    startGame,
    onChangeText,
    text,
    playRef,
    players,
    errorMessage,
    rects,
    deleteUser,
  } = useLoginScreen(props);
  return (
    <View style={{ flex: 1 }}>
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
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={Styles.content}>
            <Spacer size={24} />
            <Text style={Styles.title}>{'Simon Says'}</Text>
            <Spacer size={54} />

            <View style={Styles.contentContainer}>
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
                  <Text style={Styles.errorText}>{errorMessage}</Text>{' '}
                </>
              )}

              {players?.length > 0 && (
                <>
                  <Text style={Styles.subTitle}>OR</Text>
                  <Spacer size={18} />
                  <DropDown
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
                    selectedItemName={userName}
                    selectedTextStyle={Styles.text}
                  />
                </>
              )}

              <Spacer size={18} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={Styles.playButton}>
        <TouchableOpacity onPress={() => startGame()}>
          <LottieView
            source={require('../../assets/lotties/playBtn2.json')}
            autoPlay
            loop
            ref={playRef}
            style={{ height: 100, width: 100 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
