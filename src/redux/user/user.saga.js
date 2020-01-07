import {takeEvery, put} from 'redux-saga/effects';
import axiosInstance from '../../http/axios';
import UserActionTypes from './user.types';
import {loginFailed, loginSuccess} from './user.actions';

export function* loginStart({type, payload}) {
  try {
    const data = yield axiosInstance({
      method: 'post',
      url: '/users/login',
      data: {
        email: payload.email,
        password: payload.password,
      },
    });
    yield put(loginSuccess(data));
  } catch (e) {
    yield put(loginFailed(e.response.data));
  }
}

export function* watchLoginStart() {
  yield takeEvery(UserActionTypes.LOGIN_START, loginStart);
}
