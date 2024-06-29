import { createSlice } from '@reduxjs/toolkit';
import { InitialStateProps } from './interfaces';

const initialState: InitialStateProps = {
  userName: '',
  currentLevel: 0,
  currentSequenceIndex: 0,
  players: [],
};
export const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setCurrentLevel: (state, action) => {
      state.currentLevel = action.payload;
    },
    setCurrentSequenceIndex: (state, action) => {
      state.currentSequenceIndex = action.payload;
    },
    addPlayer: (state, action) => {
      if (state.players.includes(action.payload)) {
        state.players.push(action.payload);
      }
    },
  },
});

export const { setCurrentLevel, setCurrentSequenceIndex, setUserName } =
  gameSlice.actions;

export default gameSlice.reducer;
