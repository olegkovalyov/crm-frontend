import { UsersActionTypes } from './users.actions';
import {
  SET_USERS,
  SET_USER_ROLES_OPTIONS_FOR_FILTER,
  SET_USER_STATUS_OPTIONS_FOR_FILTER,
} from './users.types';
import {
  UserRole,
  UserStatus,
} from '../../interfaces/generated/globalTypes';
import { UserInterface } from '../../interfaces/user.interface';

export interface UsersStateInterface {
  rolesOptionsForFilter: UserRole[],
  statusOptionsForFilter: UserStatus[],
  users: UserInterface[],
}

export const usersInitialState: UsersStateInterface = {
  rolesOptionsForFilter: [],
  statusOptionsForFilter: [],
  users: [],
};

export const usersReducer = (state = usersInitialState, action: UsersActionTypes): UsersStateInterface => {
  switch (action.type) {
    case SET_USER_ROLES_OPTIONS_FOR_FILTER: {
      return {
        ...state,
        rolesOptionsForFilter: action.payload,
      };
    }
    case SET_USER_STATUS_OPTIONS_FOR_FILTER: {
      return {
        ...state,
        statusOptionsForFilter: action.payload,
      };
    }

    case SET_USERS : {
      return {
        ...state,
        users: action.payload,
      };
    }

    default:
      // eslint-disable-next-line no-case-declarations,no-unused-vars,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
