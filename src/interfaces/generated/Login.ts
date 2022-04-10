/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput, UserStatus, UserRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_currentUser {
  __typename: "UserModel";
  id: number;
  personId: string | null;
  status: UserStatus;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole[];
  licenseType: LicenseType | null;
  createdAt: any;
  updatedAt: any;
}

export interface Login_login {
  __typename: "AuthModel";
  currentUser: Login_login_currentUser | null;
  accessToken: string | null;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  input: LoginInput;
}
