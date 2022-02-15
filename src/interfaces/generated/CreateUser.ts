/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput, UserStatus, UserRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUser
// ====================================================

export interface CreateUser_createUser {
  __typename: "UserModel";
  id: number;
  status: UserStatus;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole[];
  licenseType: LicenseType | null;
  createdAt: any;
  updatedAt: any;
}

export interface CreateUser {
  createUser: CreateUser_createUser;
}

export interface CreateUserVariables {
  user: CreateUserInput;
}
