import {all, call} from 'redux-saga/effects';
import {watchLoginStart} from './user/user.saga';
import {watchFetchPlansStart} from './plan/plan.saga';

const rootSaga = function* () {
  yield all([
    call(watchLoginStart),
    call(watchFetchPlansStart),
  ]);
};

export default rootSaga;
