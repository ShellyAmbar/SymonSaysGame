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
import { setUserName } from '../../store/features/game/game-slice';
import { useDispatch, useSelector } from 'react-redux';
import Spacer from '../../components/spacer/spacer';
import LottieView from 'lottie-react-native';
import { GlobalColors } from '../../assets/styles/colors';

const LoginScreen = props => {
  const [rects, setRects] = useState<Rect[]>([]);
  const [text, onChangeText] = React.useState('');
  const playRef = useRef(null);
  const dispatch = useDispatch();

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
    dispatch(setUserName(''));
    playRef?.current.play();
    createRects();
  }, [createRects]);

  const startGame = () => {
    dispatch(setUserName(text));
    SoundPlayer.stop();
    props.navigation.replace('Main');
  };

  const { players } = useSelector(state => state.game);

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
        numColumns={3} // Adjust the number of columns as needed
        contentContainerStyle={Styles.grid}
      />
      <ScrollView contentContainerStyle={Styles.scrollContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={Styles.inner}>
            <View style={Styles.content}>
              <Text style={Styles.title}>Welcom to Simon Says</Text>
              <Spacer size={16} />
              <Text style={Styles.subTitle}>Enter your nickname:</Text>
              <Spacer size={16} />
              <TextInput
                style={Styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="your nickname"
                placeholderTextColor={'#FFFF'}
              />
              <Spacer size={16} />
              {players?.length > 0 && (
                <>
                  <Text style={Styles.subTitle}>OR</Text>
                  <Text style={Styles.text}>select from the list:</Text>
                  <Spacer size={16} />
                </>
              )}

              <TouchableOpacity
                style={Styles.playButton}
                onPress={() => startGame()}
              >
                <LottieView
                  source={require('../../assets/lotties/play.json')}
                  autoPlay
                  loop
                  ref={playRef}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
