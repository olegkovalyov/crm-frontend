import {all, call} from 'redux-saga/effects';
import {
  watchChangePasswordStart,
  watchForgotPasswordStart,
  watchLoginStart,
  watchRegisterStart,
} from './user/user.saga';
import {watchFetchPlansStart} from './plan/plan.saga';

const rootSaga = function* () {
  yield all([
    call(watchLoginStart),
    call(watchRegisterStart),
    call(watchFetchPlansStart),
    call(watchForgotPasswordStart),
    call(watchChangePasswordStart),
  ]);
};

export default rootSaga;
