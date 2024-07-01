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

  //keys -----------
  const [a3Sound, seta3Sound] = useState(
    new Sound(
      require('../../../assets/sounds/piano-keys/a3.wav'),
      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }
    )
  );
  const [b3Sound, setb3Sound] = useState(
    new Sound(
      require('../../../assets/sounds/piano-keys/b3.wav'),
      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }
    )
  );

  const [d4Sound, setd4Sound] = useState(
    new Sound(
      require('../../../assets/sounds/piano-keys/d4.wav'),
      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }
    )
  );
  const [d5Sound, setd5Sound] = useState(
    new Sound(
      require('../../../assets/sounds/piano-keys/d5.wav'),
      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }
    )
  );

  const [e4Sound, sete4Sound] = useState(
    new Sound(
      require('../../../assets/sounds/piano-keys/e4.wav'),
      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }
    )
  );

  const [e5Sound, sete5Sound] = useState(
    new Sound(
      require('../../../assets/sounds/piano-keys/e5.wav'),
      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }
    )
  );
  const [f3Sound, setf3Sound] = useState(
    new Sound(
      require('../../../assets/sounds/piano-keys/f3.wav'),
      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }
    )
  );

  const [g5Sound, setg5Sound] = useState(
    new Sound(
      require('../../../assets/sounds/piano-keys/g5.wav'),
      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }
    )
  );

  //keys -----------

  // const [blip1Sound, setBlip1Sound] = useState(
  //   new Sound(
  //     require('../../../assets/sounds/blip1.wav'),
  //     Sound.MAIN_BUNDLE,

  //     error => {
  //       if (error) {
  //         console.log('failed to load the sound', error);
  //         return;
  //       }
  //     }
  //   )
  // );
  // const [blip2Sound, setBlip2Sound] = useState(
  //   new Sound(
  //     require('../../../assets/sounds/blip2.wav'),
  //     Sound.MAIN_BUNDLE,

  //     error => {
  //       if (error) {
  //         console.log('failed to load the sound', error);
  //         return;
  //       }
  //     }
  //   )
  // );
  // const [blip3Sound, setBlip3Sound] = useState(
  //   new Sound(
  //     require('../../../assets/sounds/blip3.wav'),
  //     Sound.MAIN_BUNDLE,

  //     error => {
  //       if (error) {
  //         console.log('failed to load the sound', error);
  //         return;
  //       }
  //     }
  //   )
  // );
  // const [blip4Sound, setBlip4Sound] = useState(
  //   new Sound(
  //     require('../../../assets/sounds/blip4.wav'),
  //     Sound.MAIN_BUNDLE,

  //     error => {
  //       if (error) {
  //         console.log('failed to load the sound', error);
  //         return;
  //       }
  //     }
  //   )
  // );

  const [buttonSounds, setbuttonSounds] = useState([
    a3Sound,
    b3Sound,

    d4Sound,
    d5Sound,
    e4Sound,
    e5Sound,
    f3Sound,
    g5Sound,
    // blip1Sound,
    // blip2Sound,
    // blip3Sound,
    // blip4Sound,
    // blip1Sound,
    // blip2Sound,
    // blip3Sound,
    // blip4Sound,
  ]);

  return {
    successLevelSound,
    faileLevelSound,
    buttonSounds,
  };
};

export default useSounds;
