/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput, UserStatus, UserRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_user {
  __typename: "UserModel";
  id: string;
  status: UserStatus;
  firstName: string;
  lastName: string;
  email: string;
  roles: UserRole[];
  licenseType: LicenseType | null;
  createdAt: string;
  updatedAt: string;
}

export interface Login_login {
  __typename: "AuthModel";
  user: Login_login_user | null;
  accessToken: string | null;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  input: LoginInput;
}
