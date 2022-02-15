/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteEvent
// ====================================================

export interface DeleteEvent_deleteEvent {
  __typename: "EventModel";
  id: number;
  name: string;
  startDate: any;
  endDate: any;
  info: string;
  createdAt: any;
  updatedAt: any;
}

export interface DeleteEvent {
  deleteEvent: DeleteEvent_deleteEvent;
}

export interface DeleteEventVariables {
  id: number;
}
