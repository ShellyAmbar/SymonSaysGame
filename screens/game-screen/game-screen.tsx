import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Styles from './game-screen.styles';
import { useSelector, useDispatch } from 'react-redux';
import { updateSequence } from '../../store/features/colors-sequence/colors-sequence-slice';
import {
  setCurrentLevel,
  setCurrentSequenceIndex,
} from '../../store/features/game/game-slice';
import { addResult } from '../../store/features/results/results-slice';

import Button from './button/button';
import { ColorButton } from './button/interfaces';
import Sound from 'react-native-sound';
import LottieView from 'lottie-react-native';
import useSounds from './hooks/useSounds';

Sound.setCategory('Playback');
const GameScreen = () => {
  const dispatch = useDispatch();

  const [randomSequence, setRandonSequence] = useState<ColorButton[]>([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [numOfLevels, setNumOfLevels] = useState(2);
  const [numOfButtons, setNumOfButtons] = useState(4);
  const [currentPlayedButtonIndex, setCurrentPlayedButtonIndex] = useState(0);
  const [isfinish, setIsFinish] = useState(false);
  const animationRef = useRef<LottieView>(null);
  const { successLevelSound, faileLevelSound, nextLevelSound, buttonSounds } =
    useSounds();

  const [buttons, setButtons] = useState<ColorButton[]>([
    {
      id: 0,
      name: 'blue',
      ref: useRef(null),
      soundWav: buttonSounds[0],
    },
    {
      id: 1,
      name: 'green',
      ref: useRef(null),
      soundWav: buttonSounds[1],
    },
    {
      id: 2,
      name: 'red',
      ref: useRef(null),
      soundWav: buttonSounds[2],
    },
    {
      id: 3,
      name: 'yellow',
      ref: useRef(null),
      soundWav: buttonSounds[3],
    },
  ]);
  const [layoutHeight, setLayoutHeight] = useState(0);

  const { userName } = useSelector(state => state.game);
  const { colorsSequence } = useSelector(state => state.colorsSequence);

  // const createUniqButtons = useCallback((numOfButtons: number) => {
  //   let uniqButtonsList: ColorButton[] = [];

  //   for (let i = 0; i < numOfButtons; i++) {
  //     uniqButtonsList.push({
  //       id: i,
  //       name: GlobalColors.buttonColors[i],
  //       ref: buttonRefs[i],
  //       soundWav: buttonSounds[i],
  //     });
  //   }
  //   console.log('uniqButtonsList', uniqButtonsList);

  //   setButtons(uniqButtonsList);
  // }, []);

  const addRandomButtonToSequence = useCallback(() => {
    const randomButtonIndex = Math.floor(Math.random() * buttons.length);
    const randomButton = buttons[randomButtonIndex];
    setRandonSequence(prev => {
      let randomSequenceUpdated = [...prev, randomButton];
      return randomSequenceUpdated;
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
          faileLevelSound?.play();
          if (currentLevel === 0) {
            playLevelSequence();
          } else {
            setCurrentLevel(0);
          }

          return 0;
        } else if (prev === currentLevel) {
          console.log('prev === currentLevel', prev, currentLevel);

          if (currentLevel + 1 === randomSequence.length) {
            setRandonSequence([]);
            // setNumOfLevels(prev => prev + 1);
            successLevelSound?.play();
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

  const calculateItemHeight = () => {
    return layoutHeight / (buttons.length / 2);
  };

  return (
    <View
      onLayout={e => {
        setLayoutHeight(e.nativeEvent.layout.height);
      }}
      style={Styles.container}
    >
      {layoutHeight > 0 && (
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
                height: calculateItemHeight(),
              }}
            />
          )}
        />
      )}
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
                dispatch(
                  addResult({
                    dateCreated: Date.now(),
                    userName: userName,
                    level: numOfLevels,
                    indexInLevel: numOfLevels - 1,
                  })
                );

                setNumOfLevels(prev => prev + 1);
                nextLevelSound?.play();
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

export default GameScreen;
