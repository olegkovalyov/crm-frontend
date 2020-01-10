import {takeEvery, put} from 'redux-saga/effects';
import axiosInstance from '../../http/axios';
import UserActionTypes from './user.types';
import {loginFailed, loginSuccess, registerFailed, registerSuccess} from './user.actions';

export function* loginStart({type, payload}) {
  try {
    const response = yield axiosInstance({
      method: 'post',
      url: '/users/login',
      data: {
        email: payload.email,
        password: payload.password,
      },
    });
    yield put(loginSuccess(response));
  } catch (e) {
    yield put(loginFailed(e.response.data));
  }
}

export function* registerStart({type, payload}) {
  try {
    const response = yield axiosInstance({
      method: 'post',
      url: '/users/register',
      data: {
        name : payload.name,
        email: payload.email,
        password: payload.password,
      },
    });
    yield put(registerSuccess(response.data));
  } catch (e) {
    yield put(registerFailed(e.response.data));
  }
}

export function* watchLoginStart() {
  yield takeEvery(UserActionTypes.LOGIN_START, loginStart);
}

export function* watchRegisterStart() {
  yield takeEvery(UserActionTypes.REGISTER_START, registerStart);
}
