/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateEventInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateEvent
// ====================================================

export interface CreateEvent_createEvent {
  __typename: "EventModel";
  id: string;
  name: string;
  date: any;
  notes: string;
}

export interface CreateEvent {
  createEvent: CreateEvent_createEvent;
}

export interface CreateEventVariables {
  input: CreateEventInput;
}
