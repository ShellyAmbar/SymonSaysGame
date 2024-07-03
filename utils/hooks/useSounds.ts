import { useEffect, useState } from 'react';

const useSounds = () => {
  const [successLevelSound, setSuccessLevelSound] = useState(
    require('../../assets/sounds/success-level.wav')
  );
  const [faileLevelSound, setFailLevelSound] = useState(
    require('../../assets/sounds/fail-level.wav')
  );
  const [menuSound, setMenuSound] = useState(
    require('../../assets/sounds/menu.mp3')
  );

  const [blip1Sound, setBlip1Sound] = useState(
    require('../../assets/sounds/blip1.wav')
  );
  const [blip2Sound, setBlip2Sound] = useState(
    require('../../assets/sounds/blip2.wav')
  );
  const [blip3Sound, setBlip3Sound] = useState(
    require('../../assets/sounds/blip3.wav')
  );
  const [blip4Sound, setBlip4Sound] = useState(
    require('../../assets/sounds/blip4.wav')
  );

  const [buttonSounds, setbuttonSounds] = useState([
    blip1Sound,
    blip2Sound,
    blip3Sound,
    blip4Sound,
    blip1Sound,
    blip2Sound,
    blip3Sound,
    blip4Sound,
  ]);

  return {
    successLevelSound,
    faileLevelSound,
    buttonSounds,
    menuSound,
  };
};

export default useSounds;
