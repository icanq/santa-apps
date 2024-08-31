import { combineReducers } from '@reduxjs/toolkit';
import { api } from '../../../services/api';
import santaReducer from '../slices/santaSlice';

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  santa: santaReducer,
});
