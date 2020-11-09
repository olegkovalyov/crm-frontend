import React, { useState, useCallback } from 'react';
import { memberStatuses } from '../../../constants/member.constants';
import { MemberStatusCheckBoxesStateType } from '../../../interfaces/member.interface';
import { MemberStatus } from '../../../interfaces/generated/globalTypes';

export const useMemberStatusFilter = () => {
  const initialStatusCheckboxesState: MemberStatusCheckBoxesStateType = {
    ACTIVE: true,
    BLOCKED: true,
  };
  const [statusCheckBoxesState, setStatusCheckboxesState] = useState<MemberStatusCheckBoxesStateType>(initialStatusCheckboxesState);

  const initCheckboxes = (roles: MemberStatus[]) => {
    memberStatuses.forEach((value) => {
      initialStatusCheckboxesState[value] = roles.includes(value);
    });
    setStatusCheckboxesState(initialStatusCheckboxesState);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatusCheckboxesState(prevState => {
      const newFormRolesState = { ...prevState };
      newFormRolesState[e.target.value as MemberStatus] = e.target.checked;
      return newFormRolesState;
    });
  };

  const getSelectedStatuses = useCallback((): MemberStatus[] => {
    const selectedStatuses: MemberStatus[] = [];
    memberStatuses.forEach(value => {
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
