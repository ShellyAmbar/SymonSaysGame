import { createSlice } from '@reduxjs/toolkit';
import { InitialStateProps } from './interfaces';

const initialState: InitialStateProps = {
  userName: '',
  currentLevel: 0,
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

    addPlayer: (state, action) => {
      const lowerCaseName = action.payload.toLowerCase();

      if (state.players.findIndex(item => item.name === lowerCaseName) === -1) {
        state.players.push({ id: lowerCaseName, name: lowerCaseName });
      }
    },

    removePlayer: (state, action) => {
      const lowerCaseId = action.payload.toLowerCase();
      const filteredList = state.players.filter(
        item => item.id !== lowerCaseId
      );

      state.players = [...filteredList];
    },
  },
});

export const { setCurrentLevel, setUserName, addPlayer, removePlayer } =
  gameSlice.actions;

export default gameSlice.reducer;
