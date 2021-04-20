import { MembersActionTypes } from './members.actions';
import { SET_MEMBERS, SET_MEMBER_ROLES_OPTIONS_FOR_FILTER, SET_MEMBER_STATUS_OPTIONS_FOR_FILTER } from './members.types';
import { MemberRole, MemberStatus } from '../../interfaces/generated/globalTypes';
import { MemberInterface } from '../../interfaces/member.interface';

export interface MembersStateInterface {
  rolesOptionsForFilter: MemberRole[],
  statusOptionsForFilter: MemberStatus[],
  members: MemberInterface[],
}

export const membersInitialState: MembersStateInterface = {
  rolesOptionsForFilter: [],
  statusOptionsForFilter: [],
  members: [],
};

export const membersReducer = (state = membersInitialState, action: MembersActionTypes): MembersStateInterface => {
  switch (action.type) {
    case SET_MEMBER_ROLES_OPTIONS_FOR_FILTER: {
      return {
        ...state,
        rolesOptionsForFilter: action.payload,
      };
    }
    case SET_MEMBER_STATUS_OPTIONS_FOR_FILTER: {
      return {
        ...state,
        statusOptionsForFilter: action.payload,
      };
    }

    case SET_MEMBERS : {
      return {
        ...state,
        members: action.payload,
      };
    }

    default:
      // eslint-disable-next-line no-case-declarations,no-unused-vars,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
