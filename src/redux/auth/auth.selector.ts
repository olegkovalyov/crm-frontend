import { RootStateInterface } from '../root.reducer';
import { Login_login_user } from '../../interfaces/generated/Login';

export const getCurrentUser = (state: RootStateInterface): Login_login_user | null => {
  return state.auth.currentUser;
};

export const getAccessToken = (state: RootStateInterface): string | null => {
  return state.auth.accessToken;
};

export const doesRefreshTokenExists = (state: RootStateInterface): boolean => {
  return state.auth.refreshTokenExists;
};

