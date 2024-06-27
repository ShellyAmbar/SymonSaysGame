import { configureStore } from '@reduxjs/toolkit';
import ColorsSequenceSlice from './features/colors-sequence/colors-sequence-slice';
import ResultsSlice from './features/results/results-slice';

export default configureStore({
  reducer: {
    colorsSequence: ColorsSequenceSlice,
    results: ResultsSlice,
  },
});
