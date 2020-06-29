import jwt from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { IDecodedJwtData } from '../../interfaces/auth.interface';
import { logoutAction } from '../../redux/auth/auth.actions';

export const useIsLogged = () => {
  const dispatch = useDispatch();
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

  if (!isLogged) {
    localStorage.removeItem('token');
    dispatch(logoutAction());
  }

  return {
    isLogged,
  };
};
