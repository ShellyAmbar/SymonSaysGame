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
import { useSelector } from 'react-redux';
import Spacer from '../../components/spacer/spacer';
import LottieView from 'lottie-react-native';
const LoginScreen = () => {
  const colors = [
    '#FF0000',
    '#00FF00',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FFA500',
    '#800080',
    '#FFC0CB',
    '#808080',
  ];

  const [rects, setRects] = useState<Rect[]>([]);
  const [text, onChangeText] = React.useState('');

  const simulateRects = () => {
    if (rects.length === 30) {
      const interval = setInterval(() => {
        console.log(
          'index',
          Math.floor(Math.random() * rects.length),
          rects.length
        );

        const randomRect = rects[Math.floor(Math.random() * rects.length)];
        randomRect.ref.current?.simulateButtonPress();
      }, 500);
      return () => clearInterval(interval);
    }
  };
  const createRects = useCallback(() => {
    for (let i = 0; i < 30; i++) {
      const ref = React.createRef();
      setRects(prev => {
        prev.push({
          color: colors[Math.floor(Math.random() * colors.length)],
          ref: ref,
        });
        return rects;
      });
    }
    simulateRects();
  }, []);

  useEffect(() => {
    createRects();
  }, [createRects]);

  const createGame = () => {
    setUserName(text);
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
      <TouchableOpacity>
        <LottieView
          source={require('../../assets/lotties/confettie.json')}
          autoPlay
          loop
          ref={animationRef}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
