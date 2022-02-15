/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ResetPasswordInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword_resetPassword_payload {
  __typename: "UserModel";
  id: number;
  firstName: string;
  lastName: string;
}

export interface ResetPassword_resetPassword {
  __typename: "AuthModel";
  payload: ResetPassword_resetPassword_payload | null;
  accessToken: string | null;
}

export interface ResetPassword {
  resetPassword: ResetPassword_resetPassword;
}

export interface ResetPasswordVariables {
  input: ResetPasswordInput;
}
