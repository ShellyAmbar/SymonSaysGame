import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Styles from './login-screen.styles';
import Rectangle from './rectangle/rectangle';
import { Rect } from './interfaces';
import { setUserName, addPlayer } from '../../store/features/game/game-slice';
import { useDispatch, useSelector } from 'react-redux';
import Spacer from '../../components/spacer/spacer';
import LottieView from 'lottie-react-native';
import { GlobalColors } from '../../assets/styles/colors';
import DropDown from '../../components/drop-down/drop-down';

const LoginScreen = props => {
  const [rects, setRects] = useState<Rect[]>([]);
  const [text, onChangeText] = useState('');
  const playRef = useRef(null);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const { players, userName } = useSelector(state => state.game);
  useEffect(() => {
    if (rects?.length > 0) {
      let interval = setInterval(() => {
        const randomRect = rects[Math.floor(Math.random() * rects.length)];
        randomRect.ref.current?.simulateButtonPress();
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [rects]);

  const createRects = useCallback(() => {
    const list: Rect[] = [];
    for (let i = 0; i < 30; i++) {
      const ref = React.createRef();
      list.push({
        id: i,
        color:
          GlobalColors.buttonColors[
            Math.floor(Math.random() * GlobalColors.buttonColors.length)
          ],
        ref: ref,
      });
    }
    setRects([...list]);
  }, []);

  useEffect(() => {
    playRef?.current.play();
    createRects();
  }, [createRects]);

  const startGame = useCallback(() => {
    console.log('saving ', text);
    if (text?.length > 0) {
      dispatch(setUserName(text));
      dispatch(addPlayer(text));
      props.navigation.replace('Main');
    } else {
      if (userName?.length > 0) {
        props.navigation.replace('Main');
      } else {
        setErrorMessage('You need to enter a nickname first');
        setTimeout(() => {
          setErrorMessage(null);
        }, 1000);
      }
    }
  }, [dispatch, props.navigation, text, setErrorMessage, userName]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={Styles.container}
      enabled
    >
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
      {/* <ScrollView contentContainerStyle={Styles.scrollContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <View style={Styles.content}>
        <Text style={Styles.title}>Simon Says</Text>

        <Text style={Styles.subTitle}>{'Enter your your nickname :'}</Text>
        <TextInput
          style={Styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={
            players?.length > 0 && userName?.length > 0
              ? 'selected user name: ' + userName
              : 'Enter your your nickname'
          }
          placeholderTextColor={'#FFFF'}
        />

        {players?.length > 0 && (
          <>
            <Text style={Styles.subTitle}>OR</Text>
            <View style={Styles.horizontal}>
              <Text style={Styles.text}>select from the list:</Text>
              <DropDown
                list={players}
                onSelectItem={itemIndex => {
                  console.log('itemIndex ', itemIndex);
                  onChangeText(players[itemIndex].name);
                }}
                iconColor="#FFFF"
                itemTextStyle={Styles.dropItemText}
                containerStyle={Styles.dropDown}
                selectedItemName={userName}
              />
            </View>
            <Spacer size={16} />
          </>
        )}
        <Text style={Styles.errorText}>{errorMessage}</Text>

        <TouchableOpacity style={Styles.playButton} onPress={() => startGame()}>
          <LottieView
            source={require('../../assets/lotties/play.json')}
            autoPlay
            loop
            ref={playRef}
          />
        </TouchableOpacity>
      </View>
      {/* </TouchableWithoutFeedback>
      </ScrollView> */}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
