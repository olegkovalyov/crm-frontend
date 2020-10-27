/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MemberStatus, MemberRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL query operation: RefreshToken
// ====================================================

export interface RefreshToken_refreshToken_user {
  __typename: "MemberModel";
  id: string;
  status: MemberStatus;
  firstName: string;
  lastName: string;
  email: string;
  roles: MemberRole[];
  licenseType: LicenseType | null;
  createdAt: any;
  updatedAt: any;
}

export interface RefreshToken_refreshToken {
  __typename: "AuthModel";
  user: RefreshToken_refreshToken_user | null;
  accessToken: string | null;
}

export interface RefreshToken {
  refreshToken: RefreshToken_refreshToken;
}
