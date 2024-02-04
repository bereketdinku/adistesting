import { combineReducers } from '@reduxjs/toolkit';
import songReducer from './songSlice';

const rootReducer = combineReducers({
  songs: songReducer,
  // other reducers...
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;