import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Styles from './game-screen.styles';
import { useSelector, useDispatch } from 'react-redux';
import { updateSequence } from '../../store/features/colors-sequence/colors-sequence-slice';
import { setCurrentLevel } from '../../store/features/game/game-slice';
import { addResult } from '../../store/features/results/results-slice';

import Button from './button/button';
import { ColorButton } from './button/interfaces';
import Sound from 'react-native-sound';
import LottieView from 'lottie-react-native';
import useSounds from './hooks/useSounds';
import { GlobalColors } from '../../assets/styles/colors';

Sound.setCategory('Playback');
const GameScreen = () => {
  const dispatch = useDispatch();

  const [randomSequence, setRandonSequence] = useState<ColorButton[]>([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [lengthOfSequence, setLengthOfSequence] = useState(2);
  const [currentPlayedButtonIndex, setCurrentPlayedButtonIndex] = useState(0);
  const [isfinishLevel, setIsFinishLevel] = useState(false);
  const animationRef = useRef<LottieView>(null);
  const { successLevelSound, faileLevelSound, buttonSounds } = useSounds();

  const [buttons, setButtons] = useState<ColorButton[]>([]);
  const [isButtnosEnabled, setIsButtnosEnabled] = useState(true);
  const [layoutHeight, setLayoutHeight] = useState(0);

  const { userName } = useSelector(state => state.game);
  const { colorsSequence } = useSelector(state => state.colorsSequence);

  const createUniqButtons = useCallback(
    (numOfButtons: number) => {
      let uniqButtonsList: ColorButton[] = [];

      for (let i = 0; i < numOfButtons; i++) {
        const ref = React.createRef();
        uniqButtonsList.push({
          id: i,
          name: GlobalColors.buttonColors[i],
          ref: ref,
          soundWav: buttonSounds[i],
        });
      }

      setButtons(uniqButtonsList);
    },
    [buttonSounds]
  );

  const playLevelSequence = useCallback(
    (randomSequence: ColorButton[]) => {
      console.log(
        'playLevelSequence randomSequence?.length ',
        randomSequence?.length
      );

      if (randomSequence?.length > 0) {
        // console.log(currentLevel, randomSequence?.length);
        console.log(
          'playLevelSequence',
          randomSequence?.map(val => val.name.toString())
        );
        setIsButtnosEnabled(false);
        console.log(' setIsButtnosEnabled(false);');
        const timeoutEnableButtons = setTimeout(() => {
          setIsButtnosEnabled(true);
          console.log(' setIsButtnosEnabled(true);');

          clearTimeout(timeoutEnableButtons);
        }, currentLevel * 500 + 1000);

        const timeout = setTimeout(() => {
          for (let i = 0; i <= currentLevel; i++) {
            console.log(i, randomSequence[i].name);
            const timeoutPlayButton = setTimeout(() => {
              buttons[randomSequence[i].id].ref?.current?.simulateButtonPress();
              clearTimeout(timeoutPlayButton);
            }, 500 * i);
          }

          clearTimeout(timeout);
        }, 1000);
      }
    },
    [buttons, currentLevel]
  );

  const createRandonButtonsSequence = useCallback(
    (addedLengthOfSequence: number) => {
      console.log(
        'createRandonButtonsSequence ----------',
        'button',
        buttons.length
      );

      const list: ColorButton[] = [];
      for (let i = 0; i < addedLengthOfSequence; i++) {
        const randomButtonIndex = Math.floor(Math.random() * buttons.length);
        const randomButton = buttons[randomButtonIndex];
        list.push(randomButton);
      }

      // if (randomSequence?.length === 0) {
      //   playLevelSequence(list);
      // }

      setRandonSequence(prev => {
        const newList = [...prev, ...list];
        return newList;
      });

      // setLengthOfSequence(prev => prev + addedLengthOfSequence);

      console.log('created sequence ', list.length);
      dispatch(
        updateSequence(
          list.map(item => {
            return { id: item.id, name: item.name };
          })
        )
      );
    },
    [buttons, dispatch]
  );

  useEffect(() => {
    if (randomSequence?.length > 0) {
      setCurrentLevel(prev => prev + 1);
    }
  }, [randomSequence]);

  useEffect(() => {
    console.log('buttons.length canged', buttons.length);
    if (buttons.length === 0) {
      createUniqButtons(buttonSounds?.length);
    } else if (buttons.length > 0) {
      createRandonButtonsSequence(lengthOfSequence);
    }
  }, [buttons.length]);

  useEffect(() => {
    console.log(
      'currentLevel changed ',
      currentPlayedButtonIndex,
      randomSequence?.length
    );

    if (randomSequence?.length > 0) {
      console.log('currentPlayedButtonIndex is 0');
      let timeout = setTimeout(() => {
        playLevelSequence(randomSequence);
        clearTimeout(timeout);
      }, 300);
    }
  }, [currentLevel]);

  const onButtonPressed = useCallback(
    (button: ColorButton) => {
      console.log('click');

      setCurrentPlayedButtonIndex(prev => {
        if (button.id !== randomSequence[prev].id) {
          console.log('button.id !== randomSequence[prev].id');
          faileLevelSound?.play();
          playLevelSequence(randomSequence);

          return 0;
        } else if (prev === currentLevel) {
          console.log('prev === currentLevel', prev, currentLevel);

          if (currentLevel + 1 === randomSequence.length) {
            console.log('currentLevel + 1 === randomSequence.length');

            createRandonButtonsSequence(lengthOfSequence);
          } else {
            setCurrentLevel(prev => prev + 1);
          }
          dispatch(
            addResult({
              dateCreated: Date.now().toString(),
              userName: userName,
              level: currentLevel,
            })
          );
          animationRef.current?.play();
          successLevelSound?.play();
          setIsFinishLevel(true);
          const timeout = setTimeout(() => {
            setIsFinishLevel(false);
            clearTimeout(timeout);
          }, 2000);

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

  const calculateItemHeight = useMemo(() => {
    return layoutHeight / (buttons.length / 2);
  }, [buttons.length, layoutHeight]);
  const itemSeperator = () => <View style={{ height: 0 }} />;

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
          ItemSeparatorComponent={itemSeperator}
          contentContainerStyle={Styles.content}
          style={Styles.buttonsContainer}
          data={buttons}
          renderItem={({ item, index }) => (
            <Button
              disabled={!isButtnosEnabled}
              key={item.id}
              button={item}
              onButtonPressed={button => {
                if (isButtnosEnabled) {
                  onButtonPressed(button);
                }
              }}
              ref={item.ref}
              style={{
                height: calculateItemHeight,
              }}
            />
          )}
        />
      )}
      {isfinishLevel && (
        <View style={Styles.lottie}>
          <LottieView
            source={require('../../assets/lotties/confettie.json')}
            autoPlay
            loop
            ref={animationRef}
          />
          <Text style={Styles.nextLevelText}>
            {` Level ${currentLevel + 1}`}
          </Text>
        </View>
      )}
    </View>
  );
};

export default GameScreen;
