import { RootStateInterface } from '../root.reducer';
import { UserInterface } from '../../interfaces/member.interface';

export const getCurrentUser = (state: RootStateInterface): UserInterface | null => {
  return state.auth.currentUser;
};

export const getAccessToken = (state: RootStateInterface): string | null => {
  return state.auth.accessToken;
};

export const doesRefreshTokenExists = (state: RootStateInterface): boolean => {
  return state.auth.refreshTokenExists;
};

export const getRedirectUrl = (state: RootStateInterface): string | null => {
  return state.auth.redirectUrl;
};

