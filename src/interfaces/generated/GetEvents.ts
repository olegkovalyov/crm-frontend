/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEvents
// ====================================================

export interface GetEvents_getEvents_loads {
  __typename: "LoadModel";
  id: string;
}

export interface GetEvents_getEvents {
  __typename: "EventModel";
  id: string;
  name: string;
  date: any;
  notes: string;
  loads: GetEvents_getEvents_loads[];
}

export interface GetEvents {
  getEvents: (GetEvents_getEvents | null)[];
}
