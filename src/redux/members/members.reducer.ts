import { MembersActionTypes } from './members.actions';
import { SET_MEMBERS, SET_SELECTED_ROLES_FOR_FILTER, SET_SELECTED_STATUSES_FOR_FILTER } from './members.types';
import { MemberRole, MemberStatus } from '../../interfaces/generated/globalTypes';
import { MemberInterface } from '../../interfaces/member.interface';

export interface MembersStateInterface {
  selectedRolesForFilter: MemberRole[],
  selectedStatusesForFilter: MemberStatus[],
  members: MemberInterface[],
}

export const membersInitialState: MembersStateInterface = {
  selectedRolesForFilter: [],
  selectedStatusesForFilter: [],
  members: [],
};

export const membersReducer = (state = membersInitialState, action: MembersActionTypes): MembersStateInterface => {
  switch (action.type) {
    case SET_SELECTED_ROLES_FOR_FILTER: {
      return {
        ...state,
        selectedRolesForFilter: action.payload,
      };
    }
    case SET_SELECTED_STATUSES_FOR_FILTER: {
      return {
        ...state,
        selectedStatusesForFilter: action.payload,
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
