import { useDispatch, useSelector } from 'react-redux';
import { RootStateInterface } from '../../../../redux/store';
import { loginThunk } from '../../../../redux/auth/thunk/login.thunk';

export const useLoginFormHandler = () => {
  const dispatch = useDispatch();

  const isLoginPending = useSelector(((state: RootStateInterface) => state.loginPage.isLoginPending));

  const loginErrorMessage = useSelector(((state: RootStateInterface) => state.loginPage.loginErrorMessage));

  const handleLogin = (email: string, password: string) => {
    dispatch(loginThunk({ email, password }));
  };

  return {
    isLoginPending,
    loginErrorMessage,
    handleLogin,
  };
};
