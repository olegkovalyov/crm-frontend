import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginPageStateInterface } from '../../../../interfaces/redux/state.interface';

const initialState: LoginPageStateInterface = {
  loginErrorMessage: null,
  isLoginPending: false,
};

export const loginPageReducer = createSlice({
  name: 'login-page',
  initialState,
  reducers: {
    setLoginPending: ((state, action: PayloadAction<boolean>) => {
      state.isLoginPending = action.payload;
    }),
    setLoginErrorMessage: ((state, action: PayloadAction<string | null>) => {
      state.loginErrorMessage = action.payload;
    }),
  },
});

export const {
  setLoginErrorMessage,
  setLoginPending,
} = loginPageReducer.actions;

export default loginPageReducer.reducer;