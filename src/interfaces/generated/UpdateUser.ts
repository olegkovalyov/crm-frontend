/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput, UserStatus, UserRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser {
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

export interface UpdateUser {
  updateUser: UpdateUser_updateUser;
}

export interface UpdateUserVariables {
  user: UpdateUserInput;
}
