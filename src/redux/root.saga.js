import {all, call} from 'redux-saga/effects';
import {watchLoginStart, watchRegisterStart} from './user/user.saga';
import {watchFetchPlansStart} from './plan/plan.saga';

const rootSaga = function* () {
  yield all([
    call(watchLoginStart),
    call(watchRegisterStart),
    call(watchFetchPlansStart),
  ]);
};

export default rootSaga;
