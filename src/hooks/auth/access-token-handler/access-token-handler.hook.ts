import { useDispatch, useSelector } from 'react-redux';
import { RootStateInterface } from '../../../redux/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  setAccessTokenUpdateIntervalId,
} from '../../../redux/auth/reducer/auth.reducer';
import { accessTokenThunk } from '../../../redux/auth/thunk/access-token.thunk';
import { useCurrentUser } from '../current-user/current-user.hook';

export const useAccessTokenHandler = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { currentUser } = useCurrentUser();

  const accessTokenUpdateIntervalId = useSelector((state: RootStateInterface) => state.auth.accessTokenUpdateIntervalId);

  useEffect(() => {
    if (
      currentUser
      && !accessTokenUpdateIntervalId
    ) {
      // If we can retrieve access-token(refresh token exists) and timer is not launched yet, then run
      const intervalId = window.setInterval(() => {
        dispatch(accessTokenThunk({ router }));
      }, 5000);
      console.log('Launch interval timer with id: ', intervalId);
      dispatch(setAccessTokenUpdateIntervalId(intervalId));
    }
  }, [
    accessTokenUpdateIntervalId,
    currentUser
  ]);
};
