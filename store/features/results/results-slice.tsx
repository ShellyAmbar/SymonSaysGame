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
      console.log(
        'res  addResult',
        action.payload,
        action.payload.userName.toLowerCase()
      );

      if (
        state.results.includes(
          item =>
            item.userName.toLowerCase() ===
            action.payload.userName.toLowerCase()
        )
      ) {
        const filterdListWithoutUserName = state.results.filter(
          item => item.userName !== action.payload.userName
        );
        console.log('filterdListWithoutUserName', filterdListWithoutUserName);

        filterdListWithoutUserName.push(action.payload);
        state.results = [...filterdListWithoutUserName];
      } else {
        state.results.push(action.payload);
      }
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
