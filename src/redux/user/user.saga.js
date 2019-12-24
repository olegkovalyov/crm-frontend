import {takeEvery} from 'redux-saga/effects';
import axiosInstance from '../../http/axios';
import UserActionTypes from './user.types';

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
    console.log(data);
  } catch (e) {
    console.log(e.response.data);
  }
}

export function* watchLoginStart() {
  yield takeEvery(UserActionTypes.LOGIN_START, loginStart);
}
