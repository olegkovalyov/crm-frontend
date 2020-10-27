import { MemberRole, MemberStatus } from './generated/globalTypes';
import { GetMember_getMember } from './generated/GetMember';
import { GetStaff_getStaff } from './generated/GetStaff';

export interface MemberInterface extends GetMember_getMember {

}

export interface StaffInterface extends GetStaff_getStaff {

}

export type RoleCheckBoxesStateType = {
  [key in MemberRole]?: boolean
};

export type MemberStatusCheckBoxesStateType = {
  [key in MemberStatus]?: boolean
};

