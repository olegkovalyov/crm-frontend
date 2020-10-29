/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ClientType, ClientStatus, Gender, PaymentStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetClient
// ====================================================

export interface GetClient_getClient_tm {
  __typename: "MemberModel";
  id: string;
  firstName: string;
  lastName: string;
}

export interface GetClient_getClient_cameraman {
  __typename: "MemberModel";
  id: string;
  firstName: string;
  lastName: string;
}

export interface GetClient_getClient {
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
  tm: GetClient_getClient_tm | null;
  cameraman: GetClient_getClient_cameraman | null;
  date: any | null;
  notes: string | null;
}

export interface GetClient {
  getClient: GetClient_getClient | null;
}

export interface GetClientVariables {
  clientId: string;
}
