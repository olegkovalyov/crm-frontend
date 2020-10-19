/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteEvent
// ====================================================

export interface DeleteEvent_removeEvent {
  __typename: "EventModel";
  id: string;
}

export interface DeleteEvent {
  removeEvent: DeleteEvent_removeEvent | null;
}

export interface DeleteEventVariables {
  input: string;
}
