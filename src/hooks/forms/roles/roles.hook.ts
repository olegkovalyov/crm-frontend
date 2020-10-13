import React, { useState, useCallback } from 'react';
import { RolesType, userRoles } from '../../../constants/user.constants';
import { RoleCheckBoxesStateType } from '../../../interfaces/user.interface';

export const useRoles = () => {
  const initialRoleCheckboxesState: RoleCheckBoxesStateType = {
    SKYDIVER: false,
    STUDENT: false,
    MANIFEST: false,
    COACH: false,
    ADMIN: false,
    PACKER: false,
    RIGGER: false,
    CAMERAMAN: false,
  };
  const [roleCheckBoxesState, setRoleCheckboxesState] = useState<RoleCheckBoxesStateType>(initialRoleCheckboxesState);

  const initCheckboxes = (roles: RolesType[]) => {
    userRoles.forEach((value) => {
      initialRoleCheckboxesState[value] = roles.includes(value);
    });
    setRoleCheckboxesState(initialRoleCheckboxesState);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleCheckboxesState(prevState => {
      const newFormRolesState = { ...prevState };
      newFormRolesState[e.target.value as RolesType] = e.target.checked;
      return newFormRolesState;
    });
  };

  const getSelectedRoles = useCallback((): RolesType[] => {
    const selectedRoles: RolesType[] = [];
    userRoles.forEach(value => {
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
