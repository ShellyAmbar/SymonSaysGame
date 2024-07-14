import React, { useCallback, useEffect, useState } from 'react';
import { GlobalColors } from '../../../assets/styles/colors';
import { Rect } from '../interfaces';
import SoundPlayer from 'react-native-sound-player';
import useSounds from '../../../utils/hooks/useSounds';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPlayer,
  removePlayer,
  setUserName,
} from '../../../store/features/game/game-slice';
import { deleteResult } from '../../../store/features/results/results-slice';

const useLoginScreen = props => {
  const [rects, setRects] = useState<Rect[]>([]);
  const [text, onChangeText] = useState('');
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const { players, userName } = useSelector(state => state.game);
  const { menuSound } = useSounds();

  useEffect(() => {
    if (rects?.length > 0) {
      let interval = setInterval(() => {
        const randomRect = rects[Math.floor(Math.random() * rects.length)];
        randomRect.ref.current?.simulateButtonPress();
      }, 500);

      return () => {
        clearInterval(interval);
      };
    }
  }, [rects]);

  useEffect(() => {
    let listener = null;

    if (SoundPlayer) {
      try {
        SoundPlayer.playAsset(menuSound);
      } catch (e) {
        console.log(e);
      }

      listener = SoundPlayer.addEventListener('FinishedPlaying', () => {
        try {
          SoundPlayer.resume();
        } catch (e) {
          console.log(e);
        }
      });
    }

    return () => {
      try {
        SoundPlayer.stop();
      } catch (e) {
        console.log('SoundPlayer', e);
      }
      listener?.remove();
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
        }, 2000);
      }
    }
  }, [dispatch, text, setErrorMessage, userName]);

  const deleteUser = useCallback(
    (id: string) => {
      onChangeText('');
      dispatch(removePlayer(id));
      dispatch(deleteResult(id));

      if (id?.toLowerCase() === userName?.toLowerCase()) {
        dispatch(setUserName(null));
      }
    },
    [dispatch, userName]
  );
  return {
    userName,
    startGame,
    onChangeText,
    text,
    players,
    errorMessage,
    rects,
    deleteUser,
  };
};

export default useLoginScreen;
