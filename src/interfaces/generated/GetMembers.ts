/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetMembersFilterInput, MemberStatus, MemberRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetMembers
// ====================================================

export interface GetMembers_getMembers {
  __typename: "MemberModel";
  id: string;
  status: MemberStatus;
  firstName: string;
  lastName: string;
  email: string;
  roles: MemberRole[];
  licenseType: LicenseType | null;
  createdAt: any;
  updatedAt: any;
}

export interface GetMembers {
  getMembers: GetMembers_getMembers[];
}

export interface GetMembersVariables {
  getMembersFilter: GetMembersFilterInput;
}
