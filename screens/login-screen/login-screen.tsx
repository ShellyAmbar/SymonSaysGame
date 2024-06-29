import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
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
  const [startSimulate, setStartSimulate] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(rects.length);

    console.log('set interval ');

    let interval = setInterval(() => {
      console.log(
        'index',
        Math.floor(Math.random() * rects.length),
        rects.length
      );

      const randomRect = rects[Math.floor(Math.random() * rects.length)];
      randomRect.ref.current?.simulateButtonPress();
    }, 500);

    return () => {
      console.log('clear interval');
      clearInterval(interval);
    };
  }, [startSimulate]);

  const createRects = useCallback(() => {
    for (let i = 0; i < 30; i++) {
      const ref = React.createRef();
      setRects(prev => {
        let arr = [
          ...prev,
          {
            color:
              GlobalColors.buttonColors[
                Math.floor(Math.random() * GlobalColors.buttonColors.length)
              ],
            ref: ref,
          },
        ];

        return arr;
      });
    }
    setStartSimulate(true);
  }, [setRects]);

  useEffect(() => {
    playRef?.current.play();
    createRects();
  }, [createRects]);

  const startGame = () => {
    dispatch(setUserName(text));
    props.navigation.replace('Main');
  };

  const { players } = useSelector(state => state.game);

  return (
    <View style={Styles.container}>
      <FlatList
        style={Styles.background}
        data={rects}
        renderItem={({ item }) => (
          <Rectangle color={item.color} ref={item.ref} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3} // Adjust the number of columns as needed
        contentContainerStyle={Styles.grid}
      />

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
        </>
      )}
      <Spacer size={16} />
      <TouchableOpacity style={Styles.playButton} onPress={() => startGame()}>
        <LottieView
          source={require('../../assets/lotties/play.json')}
          autoPlay
          loop
          ref={playRef}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
