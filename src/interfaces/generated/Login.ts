/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_user {
  __typename: "UserModel";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  licenseType: string | null;
}

export interface Login_login {
  __typename: "AuthModel";
  user: Login_login_user;
  token: string;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  input: LoginInput;
}
