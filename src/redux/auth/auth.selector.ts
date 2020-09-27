import { IRootState } from '../root.reducer';
import { Login_login_user } from '../../interfaces/generated/Login';

export const getCurrentUser = (state: IRootState): Login_login_user | null => {
  return state.auth.currentUser;
};

export const getAccessToken = (state: IRootState): string | null => {
  return state.auth.accessToken;
};

export const doesRefreshTokenExists = (state: IRootState): boolean => {
  return state.auth.refreshTokenExists;
};

