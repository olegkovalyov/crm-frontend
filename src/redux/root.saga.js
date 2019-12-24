import {all, call} from 'redux-saga/effects';
import {watchLoginStart} from './user/user.saga';

const rootSaga = function* () {
  yield all([
    call(watchLoginStart),
  ]);
};

export default rootSaga;
