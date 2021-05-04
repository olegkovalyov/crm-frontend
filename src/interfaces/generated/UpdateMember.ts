/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateMemberInput, MemberStatus, MemberRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateMember
// ====================================================

export interface UpdateMember_updateMember {
  __typename: "MemberModel";
  id: number;
  userId: number;
  status: MemberStatus;
  email: string;
  firstName: string;
  lastName: string;
  roles: MemberRole[];
  licenseType: LicenseType | null;
  createdAt: any;
  updatedAt: any;
}

export interface UpdateMember {
  updateMember: UpdateMember_updateMember;
}

export interface UpdateMemberVariables {
  input: UpdateMemberInput;
}
