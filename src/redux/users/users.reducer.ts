import { UsersActionTypes } from './users.actions';
import { ADD_USER, SET_USERS } from './users.types';
import { GetUsers_getUsers } from '../../interfaces/generated/GetUsers';

export interface IUsersState {
  users: GetUsers_getUsers[]
}

export const usersState: IUsersState = {
  users: [],
};

export const usersReducer = (state = usersState, action: UsersActionTypes): IUsersState => {
  switch (action.type) {
    case SET_USERS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case ADD_USER: {
      return {
        ...state,
      };
    }
    default:
      // eslint-disable-next-line no-case-declarations,no-unused-vars,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
