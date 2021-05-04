/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateMemberInput, MemberStatus, MemberRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateMember
// ====================================================

export interface CreateMember_createMember {
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

export interface CreateMember {
  createMember: CreateMember_createMember;
}

export interface CreateMemberVariables {
  input: CreateMemberInput;
}
