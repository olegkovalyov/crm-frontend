/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MemberStatus, MemberRole, LicenseType, ClientType, ClientStatus, Gender, PaymentStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetLoads
// ====================================================

export interface GetLoads_getLoads_event {
  __typename: "EventModel";
  name: string;
  date: any;
}

export interface GetLoads_getLoads_members {
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

export interface GetLoads_getLoads_clients {
  __typename: "ClientModel";
  id: string;
  type: ClientType;
  status: ClientStatus;
  age: number;
  weight: number;
  gender: Gender;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string;
  address: string;
  withCameraman: boolean;
  withHandCameraVideo: boolean;
  paymentStatus: PaymentStatus;
  createdAt: any;
  processedAt: any | null;
  notes: string | null;
  certificate: string | null;
}

export interface GetLoads_getLoads {
  __typename: "LoadModel";
  id: string;
  status: string;
  loadNumber: number;
  date: any;
  aircraft: string;
  event: GetLoads_getLoads_event | null;
  members: GetLoads_getLoads_members[];
  clients: GetLoads_getLoads_clients[];
  notes: string | null;
}

export interface GetLoads {
  getLoads: GetLoads_getLoads[];
}

export interface GetLoadsVariables {
  eventId: string;
}
