/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteEvent
// ====================================================

export interface DeleteEvent_deleteEvent {
  __typename: "EventModel";
  id: string;
}

export interface DeleteEvent {
  deleteEvent: DeleteEvent_deleteEvent | null;
}

export interface DeleteEventVariables {
  input: string;
}
