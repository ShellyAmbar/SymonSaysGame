import { createSlice } from '@reduxjs/toolkit';
import { InitialStateProps } from './interfaces';

const initialState: InitialStateProps = {
  colorsSequence: [],
};
export const colorsSequenceSlice = createSlice({
  name: 'colorsSequence',
  initialState: initialState,
  reducers: {
    updateSequence: (state, action) => {
      state.colorsSequence = [...action.payload];
    },

    resetSequence: (state, action) => {
      state.colorsSequence = [];
    },
  },
});

export const { resetSequence, updateSequence } = colorsSequenceSlice.actions;

export default colorsSequenceSlice.reducer;
