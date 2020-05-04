import { takeEvery, put, call } from 'redux-saga/effects';
import { LOGIN_START } from './auth.types';
import { ILoginStartAction, loginFailedAction, loginSuccessAction } from './auth.actions';
import { setLoginErrorMessage, startSpinner, stopSpinner } from '../ui/ui.actions';
import { login } from '../../http/api';
import { IAuthLoginResponseData } from '../../interfaces/auth.interface';

export function* loginStartAsync({ type, payload }: ILoginStartAction): Generator {
  try {
    yield put(setLoginErrorMessage(''));
    yield put(startSpinner());

    const response = (yield call(login, payload.email, payload.password)) as IAuthLoginResponseData;


    yield put(loginSuccessAction({
      currentUser: response.currentUser,
      token: response.token,
    }));


  } catch (e) {
    // const { data } = e.response as ServerResponse;

    yield put(loginFailedAction());
    yield put(setLoginErrorMessage('Login or password are incorrect'));

  } finally {
    yield put(stopSpinner());
  }
}

export function* watchLoginStart(): Generator {
  yield takeEvery(LOGIN_START, loginStartAsync);
}
