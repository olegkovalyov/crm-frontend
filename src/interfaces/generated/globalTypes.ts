/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ClientStatus {
  ACTIVE = "ACTIVE",
  PROCESSED = "PROCESSED",
  REFUSED = "REFUSED",
}

export enum ClientType {
  AS_A_PASSENGER = "AS_A_PASSENGER",
  STATIC_LINE = "STATIC_LINE",
  TANDEM = "TANDEM",
}

export enum Gender {
  FEMALE = "FEMALE",
  MAIL = "MAIL",
}

export enum LicenseType {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  NONE = "NONE",
}

export enum MemberRole {
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

export enum MemberStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export enum PaymentStatus {
  NOT_PAID = "NOT_PAID",
  PAID = "PAID",
  REFUNDED = "REFUNDED",
}

export interface CreateEventInput {
  name: string;
  date: any;
  staffIds?: string[] | null;
  notes: string;
}

export interface CreateMemberInput {
  status: MemberStatus;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: MemberRole[];
  licenseType: LicenseType;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface GetMembersFilterInput {
  statuses?: MemberStatus[] | null;
  roles?: MemberRole[] | null;
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
  staffIds?: string[] | null;
  notes?: string | null;
}

export interface UpdateMemberInput {
  status?: MemberStatus | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  password?: string | null;
  roles?: MemberRole[] | null;
  licenseType?: LicenseType | null;
  id: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
