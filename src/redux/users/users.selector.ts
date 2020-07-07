import { IRootState } from '../root.reducer';
import { GetUsers_getUsers } from '../../interfaces/generated/GetUsers';

export const getAllUsers = (state: IRootState): GetUsers_getUsers[] => {
  return state.users.users;
};

export const getUserById = (state: IRootState, id: string): GetUsers_getUsers | undefined => {
  return state.users.users.find((user) => {
    return user.id === id;
  });
};

