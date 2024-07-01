import { combineReducers } from '@reduxjs/toolkit';
import colorsReducer from './colors-sequence/colors-sequence-slice';
import gameReducer from './game/game-slice';
import resultsReducer from './results/results-slice';
const rootReducer = combineReducers({
  colors: colorsReducer,
  game: gameReducer,
  results: resultsReducer,
});

export default rootReducer;
