import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setAuth } from '../../../redux/auth/reducer/auth.reducer';
import { AuthInterface } from '../../../interfaces/auth.interface';

export const useInitialAuth = (auth: AuthInterface | null) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth) {
      console.log('Set initial auth: ', auth);
      dispatch(setAuth(auth));
    }
  }, [auth]);
};