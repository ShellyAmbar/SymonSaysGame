import { createSlice } from '@reduxjs/toolkit';
import { InitialStateProps } from './interfaces';

const initialState: InitialStateProps = {
  colorsSequence: [],
};
export const colorsSequenceSlice = createSlice({
  name: 'colorsSequence',
  initialState: initialState,
  reducers: {
    addColor: (state, action) => {
      console.log(action.payload);

      state.colorsSequence.push(action.payload);
    },
    resetSequence: (state, action) => {
      state.colorsSequence = [];
    },
  },
});

export const { addColor, resetSequence } = colorsSequenceSlice.actions;

export default colorsSequenceSlice.reducer;
