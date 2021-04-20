import { SET_MEMBERS, SET_MEMBER_ROLES_OPTIONS_FOR_FILTER, SET_MEMBER_STATUS_OPTIONS_FOR_FILTER } from './members.types';
import { MemberRole, MemberStatus } from '../../interfaces/generated/globalTypes';
import { MemberInterface } from '../../interfaces/member.interface';


export interface SetMemberRolesOptionsForFilterActionInterface {
  type: typeof SET_MEMBER_ROLES_OPTIONS_FOR_FILTER,
  payload: MemberRole[],
}

export interface SetMemberStatusOptionsForFilterActionInterface {
  type: typeof SET_MEMBER_STATUS_OPTIONS_FOR_FILTER,
  payload: MemberStatus[],
}

export interface SetMembersActionInterface {
  type: typeof SET_MEMBERS,
  payload: MemberInterface[],
}

export const setMemberRolesOptionsForFilterAction = (roles: MemberRole[]): SetMemberRolesOptionsForFilterActionInterface => ({
  type: SET_MEMBER_ROLES_OPTIONS_FOR_FILTER,
  payload: roles,
});

export const setMemberStatusOptionsForFilterAction = (statuses: MemberStatus[]): SetMemberStatusOptionsForFilterActionInterface => ({
  type: SET_MEMBER_STATUS_OPTIONS_FOR_FILTER,
  payload: statuses,
});

export const setMembersAction = (members: MemberInterface[]): SetMembersActionInterface => ({
  type: SET_MEMBERS,
  payload: members,
});


export type MembersActionTypes = SetMemberRolesOptionsForFilterActionInterface
  | SetMemberStatusOptionsForFilterActionInterface
  | SetMembersActionInterface;
