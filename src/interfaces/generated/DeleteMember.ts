/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MemberStatus, MemberRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteMember
// ====================================================

export interface DeleteMember_deleteMember {
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

export interface DeleteMember {
  deleteMember: DeleteMember_deleteMember;
}

export interface DeleteMemberVariables {
  input: number;
}
