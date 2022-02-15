/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ClientRole {
  PASSENGER = "PASSENGER",
  STATIC_LINE = "STATIC_LINE",
  TANDEM = "TANDEM",
}

export enum ClientStatus {
  ARCHIVED = "ARCHIVED",
  PENDING = "PENDING",
  PROCESSED = "PROCESSED",
}

export enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

export enum LicenseType {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  NONE = "NONE",
}

export enum LoadStatus {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  DRAFT = "DRAFT",
  PROCESSED = "PROCESSED",
}

export enum PaymentStatus {
  NOT_PAID = "NOT_PAID",
  PAID = "PAID",
  REFUNDED = "REFUNDED",
}

export enum SlotType {
  AFF_ONE_INSTRUCTOR = "AFF_ONE_INSTRUCTOR",
  AFF_TWO_INSTRUCTORS = "AFF_TWO_INSTRUCTORS",
  COACHED_JUMP = "COACHED_JUMP",
  HOP_ON_HOP_OFF = "HOP_ON_HOP_OFF",
  PASSENGER = "PASSENGER",
  SPORT = "SPORT",
  STATIC_LINE = "STATIC_LINE",
  TM_WITHOUT_CAMERAMAN = "TM_WITHOUT_CAMERAMAN",
  TM_WITH_CAMERAMAN = "TM_WITH_CAMERAMAN",
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

export interface CreateClientInput {
  role?: ClientRole | null;
  status?: ClientStatus | null;
  paymentStatus?: PaymentStatus | null;
  gender?: Gender | null;
  dateOfBirth?: any | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  weight?: number | null;
  phone?: string | null;
  additionalInfo?: string | null;
  certificate?: string | null;
}

export interface CreateEventInput {
  name: string;
  startDate: any;
  endDate: any;
  info: string;
}

export interface CreateLoadInput {
  eventId: number;
  capacity: number;
  status: LoadStatus;
  takeOffTime?: any | null;
  landingTime?: any | null;
  info?: string | null;
}

export interface CreateSlotInput {
  loadId: number;
  type: SlotType;
  personIds: string[];
  info: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  status: UserStatus;
  firstName: string;
  lastName: string;
  role: UserRole[];
  licenseType: LicenseType;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface GetClientsInput {
  role?: ClientRole[] | null;
  status?: ClientStatus[] | null;
  paymentStatus?: PaymentStatus[] | null;
  gender?: Gender[] | null;
  minDateOfBirth?: any | null;
  maxDateOfBirth?: any | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  certificate?: string | null;
  minCreatedAt?: any | null;
  maxCreatedAt?: any | null;
  minProcessedAt?: any | null;
  maxProcessedAt?: any | null;
}

export interface GetEventsInput {
  name?: string | null;
  startDateMin?: any | null;
  startDateMax?: any | null;
  endDateMin?: any | null;
  endDateMax?: any | null;
}

export interface GetUsersInput {
  status?: UserStatus[] | null;
  role?: UserRole[] | null;
  licenseType?: LicenseType[] | null;
  firstName?: string | null;
  lastName?: string | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ResetPasswordInput {
  password: string;
  token: string;
}

export interface UpdateClientInput {
  id: number;
  role: ClientRole;
  status: ClientStatus;
  paymentStatus: PaymentStatus;
  gender: Gender;
  dateOfBirth: any;
  firstName: string;
  lastName: string;
  email?: string | null;
  weight: number;
  phone: string;
  additionalInfo?: string | null;
  certificate?: string | null;
  processedAt?: any | null;
}

export interface UpdateEventInput {
  id: number;
  name?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  info?: string | null;
}

export interface UpdateUserInput {
  email?: string | null;
  status?: UserStatus | null;
  firstName?: string | null;
  lastName?: string | null;
  role?: UserRole[] | null;
  licenseType?: LicenseType | null;
  id: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
