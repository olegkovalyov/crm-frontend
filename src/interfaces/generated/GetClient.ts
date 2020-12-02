/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ClientRole, ClientStatus, Gender, PaymentStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetClient
// ====================================================

export interface GetClient_getClient_tm {
  __typename: "UserModel";
  id: number;
}

export interface GetClient_getClient_cameraman {
  __typename: "UserModel";
  id: number;
}

export interface GetClient_getClient {
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
  tm: GetClient_getClient_tm | null;
  cameraman: GetClient_getClient_cameraman | null;
  createdAt: any;
  processedAt: any | null;
}

export interface GetClient {
  getClient: GetClient_getClient | null;
}

export interface GetClientVariables {
  id: number;
}
