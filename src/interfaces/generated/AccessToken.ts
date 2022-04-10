/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserStatus, UserRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL query operation: AccessToken
// ====================================================

export interface AccessToken_accessToken_currentUser {
  __typename: "UserModel";
  id: number;
  personId: string | null;
  status: UserStatus;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole[];
  licenseType: LicenseType | null;
  createdAt: any;
  updatedAt: any;
}

export interface AccessToken_accessToken {
  __typename: "AuthModel";
  currentUser: AccessToken_accessToken_currentUser | null;
  accessToken: string | null;
}

export interface AccessToken {
  accessToken: AccessToken_accessToken;
}
