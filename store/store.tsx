import { configureStore } from '@reduxjs/toolkit';
import ColorsSequenceSlice from './features/colors-sequence/colors-sequence-slice';
import ResultsSlice from './features/results/results-slice';
import GameSlice from './features/game/game-slice';

export default configureStore({
  reducer: {
    colorsSequence: ColorsSequenceSlice,
    results: ResultsSlice,
    game: GameSlice,
  },
});
