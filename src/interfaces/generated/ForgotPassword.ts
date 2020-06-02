/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ForgotPasswordInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ForgotPassword
// ====================================================

export interface ForgotPassword_forgotPassword {
  __typename: "ForgotPasswordModel";
  wasSentEmail: boolean;
}

export interface ForgotPassword {
  forgotPassword: ForgotPassword_forgotPassword;
}

export interface ForgotPasswordVariables {
  input: ForgotPasswordInput;
}
