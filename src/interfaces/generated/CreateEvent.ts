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
  id: number;
  name: string;
  startDate: any;
  endDate: any;
  info: string;
  createdAt: any;
  updatedAt: any;
}

export interface CreateEvent {
  createEvent: CreateEvent_createEvent;
}

export interface CreateEventVariables {
  event: CreateEventInput;
}
