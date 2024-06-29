import { createSlice } from '@reduxjs/toolkit';
import { InitialStateProps } from './interfaces';

const initialState: InitialStateProps = {
  results: [],
  sortedResultsByUser: [],
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
    setTopResultsByName: (state, action) => {
      const playerName = action.payload.name;
      const playerResults = state.results.filter(
        result => result.userName === playerName
      );
      const sortedResults = playerResults.sort((a, b) => a.score - b.score);
      console.log('sortedResults ', sortedResults);
      state.sortedResultsByUser = sortedResults;
    },
  },
});

export const { addResult, deleteResult } = resultsSlice.actions;

export default resultsSlice.reducer;
