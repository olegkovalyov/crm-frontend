/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetClientsFilterInput, ClientRole, ClientStatus, Gender, PaymentStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetClients
// ====================================================

export interface GetClients_getClients_tm {
  __typename: "UserModel";
  id: number;
}

export interface GetClients_getClients_cameraman {
  __typename: "UserModel";
  id: number;
}

export interface GetClients_getClients {
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
  paymentStatus: PaymentStatus;
  tm: GetClients_getClients_tm | null;
  cameraman: GetClients_getClients_cameraman | null;
  createdAt: any;
  processedAt: any | null;
}

export interface GetClients {
  getClients: GetClients_getClients[];
}

export interface GetClientsVariables {
  getClientsFilter: GetClientsFilterInput;
}
