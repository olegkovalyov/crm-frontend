/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateMemberInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateMember
// ====================================================

export interface UpdateMember_updateMember {
  __typename: "MemberModel";
  id: string;
}

export interface UpdateMember {
  updateMember: UpdateMember_updateMember;
}

export interface UpdateMemberVariables {
  input: UpdateMemberInput;
}
