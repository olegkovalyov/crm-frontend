import { SET_MEMBERS, SET_SELECTED_ROLES_FOR_FILTER, SET_SELECTED_STATUSES_FOR_FILTER } from './members.types';
import { MemberRole, MemberStatus } from '../../interfaces/generated/globalTypes';
import { MemberInterface } from '../../interfaces/member.interface';


export interface SetSelectedRolesForFilterActionInterface {
  type: typeof SET_SELECTED_ROLES_FOR_FILTER,
  payload: MemberRole[],
}

export interface SetSelectedStatusesForFilterActionInterface {
  type: typeof SET_SELECTED_STATUSES_FOR_FILTER,
  payload: MemberStatus[],
}

export interface SetMembersActionInterface {
  type: typeof SET_MEMBERS,
  payload: MemberInterface[],
}

export const setSelectedRolesAction = (roles: MemberRole[]): SetSelectedRolesForFilterActionInterface => ({
  type: SET_SELECTED_ROLES_FOR_FILTER,
  payload: roles,
});

export const setSelectedStatusesAction = (statuses: MemberStatus[]): SetSelectedStatusesForFilterActionInterface => ({
  type: SET_SELECTED_STATUSES_FOR_FILTER,
  payload: statuses,
});

export const setMembersAction = (members: MemberInterface[]): SetMembersActionInterface => ({
  type: SET_MEMBERS,
  payload: members,
});


export type MembersActionTypes = SetSelectedRolesForFilterActionInterface
  | SetSelectedStatusesForFilterActionInterface
  | SetMembersActionInterface;
