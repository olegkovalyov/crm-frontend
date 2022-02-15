/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserStatus, UserRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetStaff
// ====================================================

export interface GetStaff_getStaff {
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

export interface GetStaff {
  getStaff: GetStaff_getStaff[] | null;
}
