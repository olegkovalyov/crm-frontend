/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetEventsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetEvents
// ====================================================

export interface GetEvents_getEvents {
  __typename: "EventModel";
  id: number;
  name: string;
  startDate: any;
  endDate: any;
  info: string;
  createdAt: any;
  updatedAt: any;
}

export interface GetEvents {
  getEvents: GetEvents_getEvents[];
}

export interface GetEventsVariables {
  getEvents: GetEventsInput;
}
