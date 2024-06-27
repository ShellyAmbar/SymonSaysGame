import { createSlice } from '@reduxjs/toolkit';
import { InitialStateProps } from './interfaces';

const initialState: InitialStateProps = {
  results: [],
};
export const resultsSlice = createSlice({
  name: 'results',
  initialState: initialState,
  reducers: {
    addResult: (state, action) => {
      state.results.push(action.payload);
    },
    deleteResult: (state, action) => {
      state.results.filter(result => result.id !== action.payload);
    },
    // getTopScores: (state, action) => {
    //   const playerName = action.payload.name;
    //   const playerResults = state.results.filter(
    //     result => result.userName === playerName
    //   );
    //   const sortedResults = playerResults.sort((a, b) => a.score - b.score);
    //   console.log('sortedResults ', sortedResults);

    // },
  },
});

// Action creators are generated for each case reducer function
export const { addResult, deleteResult } = resultsSlice.actions;

export default resultsSlice.reducer;
