import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
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
import { useDispatch, useSelector } from 'react-redux';
import Spacer from '../../components/spacer/spacer';
import LottieView from 'lottie-react-native';
import { GlobalColors } from '../../assets/styles/colors';
import DropDown from '../../components/drop-down/drop-down';
import useSounds from '../../utils/hooks/useSounds';
import SoundPlayer from 'react-native-sound-player';

const LoginScreen = props => {
  const [rects, setRects] = useState<Rect[]>([]);
  const [text, onChangeText] = useState('');
  const playRef = useRef(null);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const { players, userName } = useSelector(state => state.game);
  const { menuSound } = useSounds();
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

  useEffect(() => {
    SoundPlayer.playAsset(menuSound);
    const listener = SoundPlayer.addEventListener('FinishedPlaying', () => {
      SoundPlayer.resume();
    });
    playRef?.current.play();
    return () => {
      SoundPlayer.stop();
      listener.remove();
    };
  }, [menuSound]);

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
    createRects();
  }, [createRects]);

  const startGame = useCallback(() => {
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

      <View style={Styles.content}>
        <Spacer size={24} />
        <Text style={Styles.title}>{'MemoMe'}</Text>
        <Spacer size={54} />

        <View style={Styles.contentContainer}>
          <Text style={Styles.subTitle}>{'Enter your your nickname :'}</Text>
          <Spacer size={8} />
          <TextInput
            style={Styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder={
              players?.length > 0 && userName?.length > 0
                ? userName
                : 'Enter your your nickname'
            }
            placeholderTextColor={'#FFFF'}
          />

          {players?.length > 0 && (
            <>
              <Spacer size={8} />
              <Text style={Styles.subTitle}>OR</Text>
              <Spacer size={8} />
              <View style={Styles.horizontal}>
                <Text style={Styles.text}>select from the list</Text>
                <Spacer size={18} isVertical={false} />
                <DropDown
                  onDeleteItem={id => {
                    dispatch(removePlayer(id));
                  }}
                  list={players}
                  onSelectItem={itemIndex => {
                    onChangeText(players[itemIndex].name);
                  }}
                  iconColor="#FFFF"
                  itemTextStyle={Styles.dropItemText}
                  containerStyle={Styles.dropDown}
                  selectedItemName={userName}
                  selectedTextStyle={Styles.text}
                />
              </View>
              <Spacer size={16} />
            </>
          )}

          <Text style={Styles.errorText}>{errorMessage}</Text>
        </View>
        <TouchableOpacity style={Styles.playButton} onPress={() => startGame()}>
          <LottieView
            source={require('../../assets/lotties/play.json')}
            autoPlay
            loop
            ref={playRef}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
