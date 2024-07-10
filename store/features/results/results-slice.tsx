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
      if (
        state.results.some(
          item =>
            item.userName.toLowerCase() ===
            action.payload.userName.toLowerCase()
        )
      ) {
        const filterdListWithoutUserName = state.results.filter(
          item => item.userName !== action.payload.userName
        );

        filterdListWithoutUserName.push(action.payload);
        state.results = [...filterdListWithoutUserName];
      } else {
        state.results.push(action.payload);
      }
    },

    deleteResult: (state, action) => {
      const lowerCaseId = action.payload.toLowerCase();
      const filteredList = state.results.filter(
        item => item.userName.toLowerCase() !== lowerCaseId
      );

      state.results = [...filteredList];
    },
  },
});

export const { addResult, deleteResult } = resultsSlice.actions;

export default resultsSlice.reducer;
