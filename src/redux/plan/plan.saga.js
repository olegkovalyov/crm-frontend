import {takeEvery, put, select} from 'redux-saga/effects';
import axiosInstance from '../../http/axios';
import PlanActionTypes from './plan.types';
import {tokenSelector} from '../user/user.selector';
import {fetchPlansFailed, fetchPlansSuccess} from './plan.actions';
import {logout} from '../user/user.actions';

export function* fetchPlansStart({type, payload}) {
  try {
    const authToken = yield select(tokenSelector);
    if (authToken) {
      axiosInstance.defaults.headers.get['Authorization'] = 'Bearer ' + authToken;
    } else {
      yield put(logout);
    }
    const response = yield axiosInstance({
      method: 'get',
      url: '/plans',
    });
    yield put(fetchPlansSuccess(response.data));
  } catch (e) {
    yield put(fetchPlansFailed(e.response.data));
  }
}

export function* watchFetchPlansStart() {
  yield takeEvery(PlanActionTypes.FETCH_PLANS_START, fetchPlansStart);
}
