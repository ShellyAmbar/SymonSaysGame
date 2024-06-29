import {
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Styles from './main-screen.styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  resetSequence,
  addColor,
} from '../../store/features/colors-sequence/colors-sequence-slice';
import { Color } from '../../store/features/colors-sequence/interfaces';
import Button from './button/button';
import { ColorButton } from './button/interfaces';
import Sound from 'react-native-sound';
import LottieView from 'lottie-react-native';
Sound.setCategory('Playback');
const MainScreen = () => {
  const colorsSequence = useSelector(
    state => state.colorsSequence.colorsSequence
  );
  const dispatch = useDispatch();
  const [buttons, setButtons] = useState<ColorButton[]>([
    {
      id: 0,
      name: 'blue',
      ref: useRef(null),
      soundWav: new Sound(
        require('../../assets/sounds/blip1.wav'),
        Sound.MAIN_BUNDLE,

        error => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        }
      ),
    },
    {
      id: 1,
      name: 'green',
      ref: useRef(null),
      soundWav: new Sound(
        require('../../assets/sounds/blip2.wav'),
        Sound.MAIN_BUNDLE,
        error => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        }
      ),
    },
    {
      id: 2,
      name: 'red',
      ref: useRef(null),
      soundWav: new Sound(
        require('../../assets/sounds/blip3.wav'),
        Sound.MAIN_BUNDLE,
        error => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        }
      ),
    },
    {
      id: 3,
      name: 'yellow',
      ref: useRef(null),
      soundWav: new Sound(
        require('../../assets/sounds/blip4.wav'),
        Sound.MAIN_BUNDLE,
        error => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        }
      ),
    },
    {
      id: 4,
      name: 'purple',
      ref: useRef(null),
      soundWav: new Sound(
        require('../../assets/sounds/blip4.wav'),
        Sound.MAIN_BUNDLE,
        error => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        }
      ),
    },
    {
      id: 5,
      name: 'gray',
      ref: useRef(null),
      soundWav: new Sound(
        require('../../assets/sounds/blip4.wav'),
        Sound.MAIN_BUNDLE,
        error => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        }
      ),
    },
  ]);
  const [randomSequence, setRandonSequence] = useState<ColorButton[]>([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [numOfLevels, setNumOfLevels] = useState(2);
  const [currentPlayedButtonIndex, setCurrentPlayedButtonIndex] = useState(0);
  const [isfinish, setIsFinish] = useState(false);
  const animationRef = useRef<LottieView>(null);

  const addRandomButtonToSequence = useCallback(() => {
    const randomButtonIndex = Math.floor(Math.random() * buttons.length);
    const randomButton = buttons[randomButtonIndex];
    setRandonSequence(prev => {
      prev.push(randomButton);
      console.log(randomButton.name + ' pushed');

      return prev;
    });
  }, [setRandonSequence, buttons]);

  const playLevelSequence = useCallback(() => {
    console.log(
      'randomSequence?.length === numOfLevels',
      randomSequence?.length === numOfLevels,
      numOfLevels,
      randomSequence?.length
    );

    if (randomSequence?.length === numOfLevels) {
      console.log(
        'playLevelSequence',
        randomSequence.map(val => val.name.toString())
      );
      const timeout = setTimeout(() => {
        for (let i = 0; i <= currentLevel; i++) {
          console.log(i, randomSequence[i].name);

          const timeoutPlayButton = setTimeout(() => {
            buttons[randomSequence[i].id].ref.current?.simulateButtonPress();
            clearTimeout(timeoutPlayButton);
          }, 1000 * i);
        }
        clearTimeout(timeout);
      }, 1000);
    }
  }, [randomSequence, buttons, currentLevel, numOfLevels]);

  const createRandonButtonsSequence = useCallback(() => {
    console.log('createRandonButtonsSequence');

    for (let i = 0; i < numOfLevels; i++) {
      addRandomButtonToSequence();
    }
  }, [numOfLevels, addRandomButtonToSequence]);

  useEffect(() => {
    console.log('numOfLevels changed');

    createRandonButtonsSequence();
  }, [numOfLevels]);

  useEffect(() => {
    console.log('currentLevel changed', currentLevel);

    playLevelSequence();
  }, [playLevelSequence, currentLevel]);

  const onButtonPressed = useCallback(
    (button: ColorButton) => {
      //  dispatch(addColor(button));

      setCurrentPlayedButtonIndex(prev => {
        if (button.id !== randomSequence[prev].id) {
          console.log('button.id !== randomSequence[prev].id');

          setCurrentLevel(0);
          return 0;
        } else if (prev === currentLevel) {
          console.log('prev === currentLevel', prev, currentLevel);

          if (currentLevel + 1 === randomSequence.length) {
            setRandonSequence([]);
            setNumOfLevels(prev => prev + 1);
            setIsFinish(true);
          } else {
            setCurrentLevel(prev => prev + 1);
          }

          return 0;
        } else if (
          prev < currentLevel &&
          button.id === randomSequence[prev].id
        ) {
          console.log('else if');
          return prev + 1;
        }
        return prev;
      });
    },
    [randomSequence, setCurrentLevel, currentLevel]
  );

  useEffect(() => {
    animationRef.current?.play();
  }, [isfinish]);

  return (
    <View style={Styles.container}>
      <FlatList
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
        contentContainerStyle={Styles.content}
        style={Styles.buttonsContainer}
        data={buttons}
        renderItem={({ item, index }) => (
          <Button
            button={item}
            onButtonPressed={onButtonPressed}
            ref={item.ref}
            style={{
              height: Dimensions.get('screen').height / (buttons.length / 2),
            }}
          />
        )}
      />
      {isfinish && (
        <View style={Styles.lottie}>
          <LottieView
            source={require('../../assets/lotties/confettie.json')}
            autoPlay
            loop
            ref={animationRef}
          />
          <TouchableOpacity>
            <Text
              onPress={() => {
                // setNumOfLevels(prev => prev + 1);
                setCurrentLevel(0);
                setIsFinish(false);
              }}
              style={Styles.nextLevelText}
            >
              Next Level
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MainScreen;
