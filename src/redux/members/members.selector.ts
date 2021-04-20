import { RootStateInterface } from '../root.reducer';
import { MemberRole, MemberStatus } from '../../interfaces/generated/globalTypes';
import { MemberInterface } from '../../interfaces/member.interface';

export const getMemberRolesOptionsForFilter = (state: RootStateInterface): MemberRole[] => state.members.rolesOptionsForFilter;

export const getMemberStatusOptionsForFilter = (state: RootStateInterface): MemberStatus[] => state.members.statusOptionsForFilter;

export const getMembers = (state: RootStateInterface): MemberInterface[] => state.members.members;

