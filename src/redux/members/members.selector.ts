import { RootStateInterface } from '../root.reducer';
import { MemberRole, MemberStatus } from '../../interfaces/generated/globalTypes';
import { MemberInterface } from '../../interfaces/member.interface';

export const getSelectedMemberRolesForFilter = (state: RootStateInterface): MemberRole[] => state.members.selectedRolesForFilter;

export const getSelectedMemberStatusesForFilter = (state: RootStateInterface): MemberStatus[] => state.members.selectedStatusesForFilter;

export const getMembers = (state: RootStateInterface): MemberInterface[] => state.members.members;

