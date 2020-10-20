/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput, UserStatus, UserRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register_user {
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

export interface Register_register {
  __typename: "AuthModel";
  user: Register_register_user | null;
  accessToken: string | null;
}

export interface Register {
  register: Register_register;
}

export interface RegisterVariables {
  input: CreateUserInput;
}
