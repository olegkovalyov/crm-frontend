/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register_user {
  __typename: "UserModel";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  licenseType: string | null;
}

export interface Register_register {
  __typename: "AuthModel";
  user: Register_register_user;
  token: string;
}

export interface Register {
  register: Register_register;
}

export interface RegisterVariables {
  input: CreateUserInput;
}
