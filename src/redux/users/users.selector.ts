import { IRootState } from '../root.reducer';
import { GetUsers_getUsers } from '../../interfaces/generated/GetUsers';

export const getAllUsers = (state: IRootState): GetUsers_getUsers[] => {
  return state.users.users;
};

