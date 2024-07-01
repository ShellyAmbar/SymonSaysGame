import { useEffect, useState } from 'react';
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
  const [CSound, setCSound] = useState(
    new Sound(
      require('../../../assets/sounds/C.mp3'),
      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }
    )
  );

  const [blip1Sound, setBlip1Sound] = useState(
    new Sound(
      require('../../../assets/sounds/blip1.wav'),
      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }
    )
  );
  const [blip2Sound, setBlip2Sound] = useState(
    new Sound(
      require('../../../assets/sounds/blip2.wav'),
      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }
    )
  );
  const [blip3Sound, setBlip3Sound] = useState(
    new Sound(
      require('../../../assets/sounds/blip3.wav'),
      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }
    )
  );
  const [blip4Sound, setBlip4Sound] = useState(
    new Sound(
      require('../../../assets/sounds/blip4.wav'),
      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }
    )
  );

  const [buttonSounds, setbuttonSounds] = useState([
    blip1Sound,
    blip2Sound,
    blip3Sound,
    blip4Sound,
  ]);

  return {
    successLevelSound,
    faileLevelSound,

    buttonSounds,
  };
};

export default useSounds;
