import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SantaState {
  response: string | null;
  error: string | null;
}

const initialState: SantaState = {
  response: null,
  error: null,
};

const santaSlice = createSlice({
  name: 'santa',
  initialState,
  reducers: {
    setResponse: (state, action: PayloadAction<string | null>) => {
      state.response = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.response = null;
    },
  },
});

export const { setResponse, setError } = santaSlice.actions;
export default santaSlice.reducer;
