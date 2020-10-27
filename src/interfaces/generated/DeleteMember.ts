/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteMember
// ====================================================

export interface DeleteMember_deleteMember {
  __typename: "MemberModel";
  id: string;
}

export interface DeleteMember {
  deleteMember: DeleteMember_deleteMember | null;
}

export interface DeleteMemberVariables {
  input: string;
}
