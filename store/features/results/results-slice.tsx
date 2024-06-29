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
      console.log('res', action.payload);

      state.results.push(action.payload);
    },
    deleteResult: (state, action) => {
      state.results.filter(
        result => result.dateCreated !== action.payload.dateCreated
      );
    },
  },
});

export const { addResult, deleteResult } = resultsSlice.actions;

export default resultsSlice.reducer;
