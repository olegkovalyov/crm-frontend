import jwt from 'jwt-decode';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../redux/root.reducer';
import { getAccessToken } from '../../../redux/auth/auth.selector';
import { IDecodedJwtData } from '../../../interfaces/auth.interface';

export const useIsAuthenticated = () => {

  let isAuthenticated = false;
  let timeFromLastUpdate = 0;

  const currentAccessToken = useSelector((state: IRootState) => getAccessToken(state));

  if (currentAccessToken) {
    const decodedToken: IDecodedJwtData = jwt(currentAccessToken);
    const expirationTime = decodedToken.exp;
    const currentTime = Math.round((new Date()).getTime() / 1000);
    if (expirationTime > currentTime) {
      isAuthenticated = true;
      timeFromLastUpdate = currentTime - decodedToken.iat;
    }
  }

  return {
    isAuthenticated,
    timeFromLastUpdate,
  };
};
