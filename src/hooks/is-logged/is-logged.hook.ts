import jwt from 'jwt-decode';
import { IDecodedJwtData } from '../../interfaces/auth.interface';

export const useIsLogged = () => {
  let isLogged = false;
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken: IDecodedJwtData = jwt(token);
    const expirationTime = decodedToken.exp;
    const currentTime = Math.round((new Date()).getTime() / 1000);
    if (expirationTime > currentTime) {
      isLogged = true;
    }
  }
  return {
    isLogged,
  };
};
