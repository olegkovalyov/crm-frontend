/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: RegisterUser
// ====================================================

export interface RegisterUser_register_payload {
  __typename: "UserModel";
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface RegisterUser_register {
  __typename: "AuthModel";
  payload: RegisterUser_register_payload | null;
  accessToken: string | null;
}

export interface RegisterUser {
  register: RegisterUser_register;
}

export interface RegisterUserVariables {
  user: CreateUserInput;
}
