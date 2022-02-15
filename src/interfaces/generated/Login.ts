/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_payload {
  __typename: "UserModel";
  id: number;
  firstName: string;
  lastName: string;
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
