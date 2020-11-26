/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MemberStatus, MemberRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetEvent
// ====================================================

export interface GetEvent_getEvent_staff {
  __typename: "MemberModel";
  id: number;
  userId: number;
  status: MemberStatus;
  firstName: string;
  lastName: string;
  email: string;
  roles: MemberRole[];
  licenseType: LicenseType | null;
  createdAt: any;
  updatedAt: any;
}

export interface GetEvent_getEvent {
  __typename: "EventModel";
  id: number;
  name: string;
  date: any;
  staff: GetEvent_getEvent_staff[];
  notes: string;
}

export interface GetEvent_getStaff {
  __typename: "MemberModel";
  id: number;
  userId: number;
  status: MemberStatus;
  firstName: string;
  lastName: string;
  email: string;
  roles: MemberRole[];
  licenseType: LicenseType | null;
  createdAt: any;
  updatedAt: any;
}

export interface GetEvent {
  getEvent: GetEvent_getEvent | null;
  getStaff: GetEvent_getStaff[] | null;
}

export interface GetEventVariables {
  eventId: number;
}
