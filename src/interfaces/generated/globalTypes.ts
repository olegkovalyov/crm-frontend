/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum LicenseType {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  NONE = "NONE",
}

export enum UserRole {
  ADMIN = "ADMIN",
  CAMERAMAN = "CAMERAMAN",
  COACH = "COACH",
  MANIFEST = "MANIFEST",
  PACKER = "PACKER",
  RIGGER = "RIGGER",
  SKYDIVER = "SKYDIVER",
  STUDENT = "STUDENT",
  TM = "TM",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export interface CreateEventInput {
  name: string;
  date: any;
  notes: string;
}

export interface CreateUserInput {
  status: UserStatus;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: UserRole[];
  licenseType: LicenseType;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface GetUsersFilterInput {
  statuses?: string[] | null;
  roles?: string[] | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ResetPasswordInput {
  password: string;
  token: string;
}

export interface UpdateEventInput {
  id: string;
  name?: string | null;
  date?: any | null;
  notes?: string | null;
}

export interface UpdateUserInput {
  status?: UserStatus | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  password?: string | null;
  roles?: UserRole[] | null;
  licenseType?: LicenseType | null;
  id: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
