import PlanActionTypes from './plan.types';

export const fetchPlansStart = () => {
  return {
    type: PlanActionTypes.FETCH_PLANS_START,
  };
};

export const fetchPlansSuccess = (data) => {
  return {
    type: PlanActionTypes.FETCH_PLANS_SUCCESS,
    payload: data,
  };
};

export const fetchPlansFailed = (data) => {
  return {
    type: PlanActionTypes.FETCH_PLANS_FAILED,
    data: data,
  };
};
