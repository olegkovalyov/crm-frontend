import { UserInterface } from '../user.interface';

export interface AuthStateInterface {
  // Auth
  currentUser: UserInterface | null,
  accessToken: string | null,
  accessTokenUpdateIntervalId: number | null;

  showBackdrop: boolean,
}

export interface LoginPageStateInterface {
  loginErrorMessage: string | null,
  isLoginPending: boolean,
}

export interface AdminLayoutStateInterface {
  isOpenedLeftMenu: boolean,
  isOpenedTopMenu: boolean,
}