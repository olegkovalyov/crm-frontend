/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateEventInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateEvent
// ====================================================

export interface UpdateEvent_updateEvent {
  __typename: "EventModel";
  id: number;
  name: string;
  startDate: any;
  endDate: any;
  info: string;
  createdAt: any;
  updatedAt: any;
}

export interface UpdateEvent {
  updateEvent: UpdateEvent_updateEvent;
}

export interface UpdateEventVariables {
  event: UpdateEventInput;
}
