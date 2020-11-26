/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateMemberInput, MemberStatus, MemberRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register_payload {
  __typename: "MemberModel";
  id: number;
  userId: number;
  status: MemberStatus;
  firstName: string;
  lastName: string;
  email: string;
  roles: MemberRole[];
  licenseType: LicenseType | null;
  createdAt: any;
  updatedAt: any;
}

export interface Register_register {
  __typename: "AuthModel";
  payload: Register_register_payload | null;
  accessToken: string | null;
}

export interface Register {
  register: Register_register;
}

export interface RegisterVariables {
  input: CreateMemberInput;
}
