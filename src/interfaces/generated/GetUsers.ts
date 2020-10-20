/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetUsersFilterInput, UserStatus, UserRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_getUsers {
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

export interface GetUsers {
  getUsers: (GetUsers_getUsers | null)[];
}

export interface GetUsersVariables {
  getUsersFilter: GetUsersFilterInput;
}
