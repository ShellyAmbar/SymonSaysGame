import { View, FlatList, Text } from 'react-native';
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
import { addResult } from '../../store/features/results/results-slice';

import Button from './button/button';
import { ColorButton } from './button/interfaces';
import LottieView from 'lottie-react-native';
import useSounds from '../../utils/hooks/useSounds';
import { GlobalColors } from '../../assets/styles/colors';
import UserScoresModal from '../../modals/user-scores-modal/user-scores-modal';
import SoundPlayer from 'react-native-sound-player';

const GameScreen = () => {
  const dispatch = useDispatch();

  const [randomSequence, setRandonSequence] = useState<ColorButton[]>([]);
  const [currentPlayedButtonIndex, setCurrentPlayedButtonIndex] = useState(0);
  const [isfinishLevel, setIsFinishLevel] = useState(false);
  const animationRef = useRef<LottieView>(null);
  const { successLevelSound, faileLevelSound, buttonSounds } = useSounds();

  const [buttons, setButtons] = useState<ColorButton[]>([]);
  const [isButtnosEnabled, setIsButtnosEnabled] = useState(true);
  const [layoutHeight, setLayoutHeight] = useState(0);

  const { userName } = useSelector(state => state.game);
  const { colorsSequence } = useSelector(state => state.colorsSequence);
  const { results } = useSelector(state => state.results);
  const [isModalScoresVisible, setIsModalScoresVisible] = useState(false);
  const getUserLevel = useMemo(() => {
    const playerResult = results?.filter(
      result => result.userName === userName
    );

    return playerResult?.length > 0 ? playerResult[0].level : 0;
  }, []);
  const [currentLevel, setCurrentLevel] = useState(getUserLevel);
  const [lengthOfSequence, setLengthOfSequence] = useState(50);

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
            const timeoutPlayButton = setTimeout(() => {
              buttons[randomSequence[i].id].ref?.current?.simulateButtonPress();
              clearTimeout(timeoutPlayButton);
            }, 600 * i);
          }

          clearTimeout(timeout);
        }, 1000);
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
      createUniqButtons(10);
    } else if (buttons.length > 0) {
      createRandonButtonsSequence(lengthOfSequence);
    }
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

  const onButtonPressed = useCallback(
    (button: ColorButton) => {
      setCurrentPlayedButtonIndex(prev => {
        if (button.id !== randomSequence[prev].id) {
          SoundPlayer.playAsset(faileLevelSound);

          if (results?.length > 0) {
            setIsModalScoresVisible(true);
          } else {
            playLevelSequence(randomSequence);
          }

          return 0;
        } else if (prev === currentLevel) {
          if (currentLevel + 1 === randomSequence.length - 1) {
            createRandonButtonsSequence(lengthOfSequence);
          }
          setCurrentLevel(prev => prev + 1);
          dispatch(
            addResult({
              dateCreated: Date.now().toString(),
              userName: userName,
              level: currentLevel + 1,
            })
          );
          animationRef.current?.play();
          SoundPlayer.playAsset(successLevelSound);
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

      {isModalScoresVisible && (
        <UserScoresModal
          isModalVisible={isModalScoresVisible}
          onBackdropPress={() => {
            setIsModalScoresVisible(false);
            playLevelSequence(randomSequence);
          }}
          onClickClose={() => {
            setIsModalScoresVisible(false);
            playLevelSequence(randomSequence);
          }}
        />
      )}
    </View>
  );
};

export default GameScreen;
