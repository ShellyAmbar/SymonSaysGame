import { useEffect, useState } from 'react';

const useSounds = () => {
  const [successLevelSound, setSuccessLevelSound] = useState(
    require('../../assets/sounds/win2.wav')
  );
  const [faileLevelSound, setFailLevelSound] = useState(
    require('../../assets/sounds/end.mp3')
  );
  const [menuSound, setMenuSound] = useState(
    require('../../assets/sounds/menu.mp3')
  );

  // const [blip1Sound, setBlip1Sound] = useState(
  //   require('../../assets/sounds/blip1.wav')
  // );
  // const [blip2Sound, setBlip2Sound] = useState(
  //   require('../../assets/sounds/blip2.wav')
  // );
  // const [blip3Sound, setBlip3Sound] = useState(
  //   require('../../assets/sounds/blip3.wav')
  // );
  // const [blip4Sound, setBlip4Sound] = useState(
  //   require('../../assets/sounds/blip4.wav')
  // );

  ////

  const [a3Sound, setA3Sound] = useState(
    require('../../assets/sounds/keys/a3.mp3')
  );
  const [a4Sound, setA4Sound] = useState(
    require('../../assets/sounds/keys/a4.mp3')
  );
  const [b3Sound, setB3Sound] = useState(
    require('../../assets/sounds/keys/b3.mp3')
  );

  const [d5Sound, setD5Sound] = useState(
    require('../../assets/sounds/keys/d5.mp3')
  );
  const [e4Sound, setE4Sound] = useState(
    require('../../assets/sounds/keys/e4.mp3')
  );
  const [f3Sound, setF3Sound] = useState(
    require('../../assets/sounds/keys/f3.mp3')
  );

  //////

  const [buttonSounds, setbuttonSounds] = useState([
    a3Sound,
    a4Sound,
    b3Sound,
    d5Sound,
    e4Sound,
    f3Sound,
  ]);

  return {
    successLevelSound,
    faileLevelSound,
    buttonSounds,
    menuSound,
  };
};

export default useSounds;
