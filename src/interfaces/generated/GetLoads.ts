/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetClientsFilterInput, GetMembersFilterInput, LoadStatus, UserRole, ClientRole, ClientStatus, Gender, MemberStatus, MemberRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetLoads
// ====================================================

export interface GetLoads_getLoads_slots {
  __typename: "SlotModel";
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  role: UserRole;
  description: string;
}

export interface GetLoads_getLoads {
  __typename: "LoadModel";
  id: number;
  status: LoadStatus;
  order: number;
  date: any;
  aircraft: string;
  notes: string | null;
  slots: GetLoads_getLoads_slots[];
}

export interface GetLoads_getClients {
  __typename: "ClientModel";
  id: number;
  userId: number;
  role: ClientRole;
  status: ClientStatus;
  gender: Gender;
  age: number;
  firstName: string;
  lastName: string;
  email: string | null;
  weight: number;
  phone: string;
  address: string;
  withHandCameraVideo: boolean;
  withCameraman: boolean;
  notes: string | null;
  certificate: string | null;
  createdAt: any;
  processedAt: any | null;
}

export interface GetLoads_getMembers {
  __typename: "MemberModel";
  id: number;
  userId: number;
  status: MemberStatus;
  firstName: string;
  lastName: string;
  email: string;
  roles: MemberRole[];
  licenseType: LicenseType | null;
  createdAt: any;
  updatedAt: any;
}

export interface GetLoads {
  getLoads: GetLoads_getLoads[];
  getClients: GetLoads_getClients[];
  getMembers: GetLoads_getMembers[];
}

export interface GetLoadsVariables {
  eventId: number;
  getClientsFilter: GetClientsFilterInput;
  getMembersFilter: GetMembersFilterInput;
}
