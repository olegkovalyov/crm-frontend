import React, { useState, useCallback } from 'react';
import { userStatuses } from '../../../constants/user.constants';
import { UserStatusCheckBoxesStateType } from '../../../interfaces/user.interface';
import { UserStatus } from '../../../interfaces/generated/globalTypes';

export const useStatusFilter = () => {
  const initialStatusCheckboxesState: UserStatusCheckBoxesStateType = {
    ACTIVE: true,
    BLOCKED: true,
  };
  const [statusCheckBoxesState, setStatusCheckboxesState] = useState<UserStatusCheckBoxesStateType>(initialStatusCheckboxesState);

  const initCheckboxes = (roles: UserStatus[]) => {
    userStatuses.forEach((value) => {
      initialStatusCheckboxesState[value] = roles.includes(value);
    });
    setStatusCheckboxesState(initialStatusCheckboxesState);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatusCheckboxesState(prevState => {
      const newFormRolesState = { ...prevState };
      newFormRolesState[e.target.value as UserStatus] = e.target.checked;
      return newFormRolesState;
    });
  };

  const getSelectedStatuses = useCallback((): UserStatus[] => {
    const selectedStatuses: UserStatus[] = [];
    userStatuses.forEach(value => {
      if (statusCheckBoxesState[value] === true) {
        selectedStatuses.push(value);
      }
    });
    return selectedStatuses;
  }, [statusCheckBoxesState]);

  return {
    statusCheckBoxesState,
    setStatusCheckboxesState,
    handleStatusChange,
    getSelectedStatuses,
    initialStatusCheckboxesState,
    initStatusCheckboxes: initCheckboxes,
  };
};
