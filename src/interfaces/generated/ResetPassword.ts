/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ResetPasswordInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword_resetPassword_user {
  __typename: "UserModel";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  licenseType: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ResetPassword_resetPassword {
  __typename: "AuthModel";
  user: ResetPassword_resetPassword_user | null;
  accessToken: string | null;
}

export interface ResetPassword {
  resetPassword: ResetPassword_resetPassword;
}

export interface ResetPasswordVariables {
  input: ResetPasswordInput;
}
