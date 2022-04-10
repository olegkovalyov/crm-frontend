import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStateInterface } from '../../../interfaces/redux/state.interface';
import { AuthInterface } from '../../../interfaces/auth.interface';

const initialState: AuthStateInterface = {
  // Data
  currentUser: null,
  accessToken: null,
  accessTokenUpdateIntervalId: null,
  showBackdrop: false,
};

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessTokenUpdateIntervalId: ((state, action: PayloadAction<number | null>) => {
      state.accessTokenUpdateIntervalId = action.payload;
    }),
    setAuth: ((state, action: PayloadAction<AuthInterface | null>) => {
      if (action.payload) {
        state.currentUser = action.payload.currentUser;
        state.accessToken = action.payload.accessToken;
      } else {
        state.currentUser = null;
        state.accessToken = null;
      }
    }),
    resetAuth: (state) => {
      window.clearInterval(state.accessTokenUpdateIntervalId);
      return { ...initialState };
    },
  },
});


export const {
  setAccessTokenUpdateIntervalId,
  setAuth,
  resetAuth,
} = authReducer.actions;

export default authReducer.reducer;