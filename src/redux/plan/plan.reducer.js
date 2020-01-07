import PlanActionTypes from './plan.types';

const initial_state = {
  plans: [],
  isLoadingPlans: false,
  errorMessage: null,
};

const planReducer = (state = initial_state, action) => {
  switch (action.type) {
    case PlanActionTypes.FETCH_PLANS_START: {
      return {
        ...state,
        plans: [],
        isLoadingPlans: true,
        errorMessage: null,
      };
    }
    case PlanActionTypes.FETCH_PLANS_SUCCESS: {
      return {
        ...state,
        plans: action.payload.data,
        isLoadingPlans: false,
        errorMessage: null,
      };
    }
    case PlanActionTypes.FETCH_PLANS_FAILED: {
      return {
        ...state,
        plans: [],
        isLoadingPlans: false,
        errorMessage: action.payload.message
      };
    }
    default:
      return state;
  }
};
export default planReducer;
