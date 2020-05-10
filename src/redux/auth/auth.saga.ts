import { takeEvery, put, call } from 'redux-saga/effects';
import { LOGIN_START, REGISTER_START } from './auth.types';
import {
  ILoginStartAction,
  IRegisterStartAction,
  loginFailedAction,
  loginSuccessAction,
  registerFailedAction, registerSuccessAction,
} from './auth.actions';
import { setLoginErrorMessage, setRegisterErrorMessage, startSpinner, stopSpinner } from '../ui/ui.actions';
import { login, register } from '../../http/api';
import { IAuthSuccessResponseData } from '../../interfaces/auth.interface';

export function* loginStartAsync({ type, payload }: ILoginStartAction): Generator {
  try {
    yield put(setLoginErrorMessage(''));
    yield put(startSpinner());

    const response = (yield call(login, payload.email, payload.password)) as IAuthSuccessResponseData;

    yield put(loginSuccessAction({
      currentUser: response.currentUser,
      token: response.token,
    }));
  } catch (e) {
    yield put(loginFailedAction());
    yield put(setLoginErrorMessage('Login or password are incorrect'));
  } finally {
    yield put(stopSpinner());
  }
}

export function* registerStartAsync({ type, payload }: IRegisterStartAction): Generator {
  try {
    yield put(setRegisterErrorMessage(''));
    yield put(startSpinner());

    const response = (yield call(register, payload.firstName, payload.lastName, payload.email, payload.password)) as IAuthSuccessResponseData;
    yield put(registerSuccessAction({
      currentUser: response.currentUser,
      token: response.token,
    }));

  } catch (e) {
    yield put(registerFailedAction());
    yield put(setRegisterErrorMessage('Failed to register user'));
  } finally {
    yield put(stopSpinner());
  }
}

export function* watchLoginStart(): Generator {
  yield takeEvery(LOGIN_START, loginStartAsync);
}

export function* watchRegisterStart(): Generator {
  yield takeEvery(REGISTER_START, registerStartAsync);
}
