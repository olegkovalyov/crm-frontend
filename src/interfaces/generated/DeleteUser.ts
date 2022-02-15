/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserStatus, UserRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteUser
// ====================================================

export interface DeleteUser_deleteUser {
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

export interface DeleteUser {
  deleteUser: DeleteUser_deleteUser;
}

export interface DeleteUserVariables {
  id: number;
}
