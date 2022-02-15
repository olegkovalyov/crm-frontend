/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetUsersInput, UserStatus, UserRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_getUsers {
  __typename: "UserModel";
  id: number;
  personId: string | null;
  status: UserStatus;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole[];
  licenseType: LicenseType | null;
  createdAt: any;
  updatedAt: any;
}

export interface GetUsers {
  getUsers: GetUsers_getUsers[];
}

export interface GetUsersVariables {
  getUsersInput: GetUsersInput;
}
