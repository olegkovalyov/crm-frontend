/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput, MemberStatus, MemberRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_payload {
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

export interface Login_login {
  __typename: "AuthModel";
  payload: Login_login_payload | null;
  accessToken: string | null;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  input: LoginInput;
}
