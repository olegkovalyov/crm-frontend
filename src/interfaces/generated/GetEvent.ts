/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEvent
// ====================================================

export interface GetEvent_getEvent_loads {
  __typename: "LoadModel";
  id: string;
  aircraft: string;
  date: any;
  status: string;
}

export interface GetEvent_getEvent {
  __typename: "EventModel";
  id: string;
  name: string;
  date: any;
  notes: string;
  loads: GetEvent_getEvent_loads[] | null;
}

export interface GetEvent {
  getEvent: GetEvent_getEvent | null;
}

export interface GetEventVariables {
  input: string;
}
