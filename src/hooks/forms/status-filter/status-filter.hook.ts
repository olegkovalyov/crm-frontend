import React, { useState, useCallback } from 'react';
import { userStatuses, UserStatusType } from '../../../constants/user.constants';
import { UserStatusCheckBoxesStateType } from '../../../interfaces/user.interface';

export const useStatusFilter = () => {
  const initialStatusCheckboxesState: UserStatusCheckBoxesStateType = {
    ACTIVE: true,
    BLOCKED: true,
  };
  const [statusCheckBoxesState, setStatusCheckboxesState] = useState<UserStatusCheckBoxesStateType>(initialStatusCheckboxesState);

  const initCheckboxes = (roles: UserStatusType[]) => {
    userStatuses.forEach((value) => {
      initialStatusCheckboxesState[value] = roles.includes(value);
    });
    setStatusCheckboxesState(initialStatusCheckboxesState);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatusCheckboxesState(prevState => {
      const newFormRolesState = { ...prevState };
      newFormRolesState[e.target.value as UserStatusType] = e.target.checked;
      return newFormRolesState;
    });
  };

  const getSelectedStatuses = useCallback((): UserStatusType[] => {
    const selectedStatuses: UserStatusType[] = [];
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
