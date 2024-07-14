import { useDispatch, useSelector } from 'react-redux';
import useSounds from '../../../utils/hooks/useSounds';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ColorButton } from '../button/interfaces';
import React from 'react';
import { GlobalColors } from '../../../assets/styles/colors';
import { updateSequence } from '../../../store/features/colors-sequence/colors-sequence-slice';
import { addResult } from '../../../store/features/results/results-slice';
import SoundPlayer from 'react-native-sound-player';

const useGameScreen = () => {
  const dispatch = useDispatch();
  const { successLevelSound, faileLevelSound, buttonSounds } = useSounds();
  const animationRef = useRef<LottieView>(null);
  const { userName } = useSelector(state => state.game);
  const { colorsSequence } = useSelector(state => state.colorsSequence);
  const { results } = useSelector(state => state.results);
  const [currentPlayedButtonIndex, setCurrentPlayedButtonIndex] = useState(0);
  const [randomSequence, setRandonSequence] = useState<ColorButton[]>([]);
  const [isfinishLevel, setIsFinishLevel] = useState(false);
  const [buttons, setButtons] = useState<ColorButton[]>([]);
  const [isButtnosEnabled, setIsButtnosEnabled] = useState(true);
  const [isModalScoresVisible, setIsModalScoresVisible] = useState(false);
  const getUserLevel = useMemo(() => {
    const playerResult = results?.filter(
      result => result.userName === userName
    );

    return playerResult?.length > 0 ? playerResult[0].level : 0;
  }, []);
  const [currentLevel, setCurrentLevel] = useState(getUserLevel);
  const [lengthOfSequence, setLengthOfSequence] = useState(50);
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [showCountDown, setShowCountDown] = useState(false);

  const createUniqButtons = useCallback(
    (numOfButtons: number) => {
      let uniqButtonsList: ColorButton[] = [];

      for (let i = 0; i < numOfButtons; i++) {
        const ref = React.createRef();
        uniqButtonsList.push({
          id: i,
          name: GlobalColors.buttonColors[i],
          ref: ref,
          soundWav:
            buttonSounds[Math.floor(Math.random() * buttonSounds.length)],
        });
      }

      setButtons(uniqButtonsList);
    },
    [buttonSounds]
  );
  const playLevelSequence = useCallback(
    (randomSequence: ColorButton[]) => {
      if (randomSequence?.length > 0) {
        setIsButtnosEnabled(false);

        const timeoutEnableButtons = setTimeout(() => {
          setIsButtnosEnabled(true);

          clearTimeout(timeoutEnableButtons);
        }, currentLevel * 500 + 1000);

        const timeout = setTimeout(() => {
          for (let i = 0; i <= currentLevel; i++) {
            const timeoutPlayButton = setTimeout(async () => {
              await buttons[
                randomSequence[i].id
              ].ref?.current?.simulateButtonPress();
              if (i === currentLevel) {
                setShowCountDown(true);
              }
              clearTimeout(timeoutPlayButton);
            }, 800 * i);
          }

          clearTimeout(timeout);
        }, 0);
      }
    },
    [buttons, currentLevel]
  );
  const createRandonButtonsSequence = useCallback(
    (addedLengthOfSequence: number) => {
      const list: ColorButton[] = [];
      for (let i = 0; i < addedLengthOfSequence; i++) {
        const randomButtonIndex = Math.floor(Math.random() * buttons.length);
        const randomButton = buttons[randomButtonIndex];
        list.push(randomButton);
      }

      setRandonSequence(prev => {
        const newList = [...prev, ...list];
        return newList;
      });

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
    if (buttons.length === 0) {
      createUniqButtons(4);
    } else if (buttons.length > 0) {
      createRandonButtonsSequence(lengthOfSequence);
    }

    return () => {
      try {
        SoundPlayer?.stop();
      } catch (e) {
        console.log(e);
      }
    };
  }, [buttons.length]);
  useEffect(() => {
    if (
      randomSequence?.length > 0 &&
      currentLevel + 1 < randomSequence?.length
    ) {
      let timeout = setTimeout(() => {
        playLevelSequence(randomSequence);
        clearTimeout(timeout);
      }, 300);
    }
  }, [currentLevel, randomSequence?.length?.toString()]);

  const onFailure = useCallback(() => {
    setIsButtnosEnabled(false);
    setShowCountDown(false);
    const timeout1 = setTimeout(() => {
      SoundPlayer.playAsset(faileLevelSound);
      clearTimeout(timeout1);
    }, 300);

    const timeout = setTimeout(() => {
      if (results?.length > 0) {
        setIsModalScoresVisible(true);
      } else {
        playLevelSequence(randomSequence);
      }
      clearTimeout(timeout);
    }, 2000);
  }, [
    setIsModalScoresVisible,
    playLevelSequence,
    setShowCountDown,
    results?.length,
    faileLevelSound,
    randomSequence,
  ]);

  const onButtonPressed = useCallback(
    (button: ColorButton) => {
      setCurrentPlayedButtonIndex(prev => {
        if (button.id !== randomSequence[prev].id) {
          onFailure();

          return 0;
        } else if (prev === currentLevel) {
          if (currentLevel + 1 === randomSequence.length - 1) {
            createRandonButtonsSequence(lengthOfSequence);
          }

          dispatch(
            addResult({
              dateCreated: Date.now().toString(),
              userName: userName,
              level: currentLevel + 1,
            })
          );
          const timeout1 = setTimeout(() => {
            SoundPlayer.playAsset(successLevelSound);
            clearTimeout(timeout1);
          }, 300);
          animationRef.current?.play();

          setIsFinishLevel(true);
          setShowCountDown(false);
          const timeout = setTimeout(() => {
            setIsFinishLevel(false);
            setCurrentLevel(prevval => prevval + 1);
            clearTimeout(timeout);
          }, 3000);
          return 0;
        } else if (
          prev < currentLevel &&
          button.id === randomSequence[prev].id
        ) {
          return prev + 1;
        }
        return prev;
      });
    },
    [randomSequence, setCurrentLevel, currentLevel]
  );
  const calculateItemHeight = useMemo(() => {
    // return layoutHeight / (buttons.length / 2);
    return layoutWidth / 2 - 20;
  }, [layoutWidth]);
  return {
    setLayoutWidth,
    calculateItemHeight,
    onButtonPressed,
    isModalScoresVisible,
    setIsModalScoresVisible,
    isButtnosEnabled,
    buttons,
    isfinishLevel,
    animationRef,
    currentLevel,
    playLevelSequence,
    randomSequence,
    showCountDown,
    onFailure,
  };
};

export default useGameScreen;
