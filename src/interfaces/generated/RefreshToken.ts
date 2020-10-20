/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserStatus, UserRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL query operation: RefreshToken
// ====================================================

export interface RefreshToken_refreshToken_user {
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

export interface RefreshToken_refreshToken {
  __typename: "AuthModel";
  user: RefreshToken_refreshToken_user | null;
  accessToken: string | null;
}

export interface RefreshToken {
  refreshToken: RefreshToken_refreshToken;
}
