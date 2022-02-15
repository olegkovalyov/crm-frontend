/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserStatus, UserRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_getUser {
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

export interface GetUser {
  getUser: GetUser_getUser | null;
}

export interface GetUserVariables {
  id: number;
}
