import { Login_login, Login_login_payload } from './generated/Login';

export interface DecodedJwtDataInterface {
  email: string,
  firstName: string,
  lastName: string,
  exp: number,
  iat: number,
  licenseType: string,
  role: string
}

export interface AuthDataInterface extends Login_login {

}

export interface AuthInterface {
  user: UserInterface | null;
  accessToken: string | null;
  message: string | null;
}

export interface UserInterface extends Login_login_payload {

}
