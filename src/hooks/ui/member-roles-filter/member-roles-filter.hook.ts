import React, { useState, useCallback } from 'react';
import {  memberRoles } from '../../../constants/member.constants';
import { RoleCheckBoxesStateType } from '../../../interfaces/member.interface';
import { MemberRole } from '../../../interfaces/generated/globalTypes';

export const useMemberRolesFilter = () => {
  const initialRoleCheckboxesState: RoleCheckBoxesStateType = {
    SKYDIVER: false,
    STUDENT: false,
    MANIFEST: false,
    COACH: false,
    TM: false,
    ADMIN: false,
    PACKER: false,
    RIGGER: false,
    CAMERAMAN: false,
  };
  const [roleCheckBoxesState, setRoleCheckboxesState] = useState<RoleCheckBoxesStateType>(initialRoleCheckboxesState);

  const initCheckboxes = (roles: MemberRole[]) => {
    memberRoles.forEach((value) => {
      initialRoleCheckboxesState[value] = roles.includes(value);
    });
    setRoleCheckboxesState(initialRoleCheckboxesState);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleCheckboxesState(prevState => {
      const newFormRolesState = { ...prevState };
      newFormRolesState[e.target.value as MemberRole] = e.target.checked;
      return newFormRolesState;
    });
  };

  const getSelectedRoles = useCallback((): MemberRole[] => {
    const selectedRoles: MemberRole[] = [];
    memberRoles.forEach(value => {
      if (roleCheckBoxesState[value] === true) {
        selectedRoles.push(value);
      }
    });
    return selectedRoles;
  }, [roleCheckBoxesState]);

  return {
    roleCheckBoxesState,
    setRoleCheckboxesState,
    handleRoleChange,
    getSelectedRoles,
    initialRoleCheckboxesState,
    initCheckboxes,
  };
};
