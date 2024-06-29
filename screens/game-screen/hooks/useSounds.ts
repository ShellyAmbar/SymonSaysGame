import { useState } from 'react';
import Sound from 'react-native-sound';

const useSounds = () => {
  Sound.setCategory('Playback');
  const [successLevelSound, setSuccessLevelSound] = useState<Sound>(
    new Sound(
      require('../../../assets/sounds/success-level.wav'),
      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }
    )
  );
  const [faileLevelSound, setFailLevelSound] = useState(
    new Sound(
      require('../../../assets/sounds/fail-level.wav'),
      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }
    )
  );
  const [nextLevelSound, setNextLevelSound] = useState(
    new Sound(
      require('../../../assets/sounds/next-level.wav'),
      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }
    )
  );

  return {
    successLevelSound,
    faileLevelSound,
    nextLevelSound,
  };
};

export default useSounds;
