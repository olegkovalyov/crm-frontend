/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoadStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetLoads
// ====================================================

export interface GetLoads_getLoads_slots {
  __typename: "SlotModel";
  id: number;
}

export interface GetLoads_getLoads {
  __typename: "LoadModel";
  id: number;
  status: LoadStatus;
  capacity: number;
  order: number;
  slots: GetLoads_getLoads_slots[];
  info: string;
  takeOffTime: any | null;
  landingTime: any | null;
  createdAt: any;
  updatedAt: any;
}

export interface GetLoads {
  getLoads: GetLoads_getLoads[];
}

export interface GetLoadsVariables {
  eventId: number;
}
