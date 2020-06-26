import { IRootState } from '../root.reducer';

export const getCurrentUser = (state: IRootState) => {
  return state.auth.currentUser;
};

