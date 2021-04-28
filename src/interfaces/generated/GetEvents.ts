/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetEventsFilterInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetEvents
// ====================================================

export interface GetEvents_getEvents {
  __typename: "EventModel";
  id: number;
  title: string;
  startDate: any;
  endDate: any;
}

export interface GetEvents {
  getEvents: GetEvents_getEvents[];
}

export interface GetEventsVariables {
  getEventsFilter: GetEventsFilterInput;
}
