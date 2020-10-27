import { Login_login } from './generated/Login';

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
