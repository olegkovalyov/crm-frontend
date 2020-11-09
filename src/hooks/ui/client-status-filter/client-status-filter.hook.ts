import React, { useState, useCallback } from 'react';
import { ClientStatus } from '../../../interfaces/generated/globalTypes';
import { ClientStatusCheckBoxesStateType } from '../../../interfaces/client.interface';
import { clientStatuses } from '../../../constants/client.constants';

export const useClientStatusFilter = () => {
  const initialClientStatusCheckboxesState: ClientStatusCheckBoxesStateType = {
    ACTIVE: true,
    PROCESSED: true,
    REFUSED: true,
  };
  const [clientStatusCheckBoxesState, setClientStatusCheckboxesState] = useState<ClientStatusCheckBoxesStateType>(initialClientStatusCheckboxesState);

  const initCheckboxes = (statuses: ClientStatus[]) => {
    clientStatuses.forEach((value) => {
      initialClientStatusCheckboxesState[value] = statuses.includes(value);
    });
    setClientStatusCheckboxesState(initialClientStatusCheckboxesState);
  };

  const handleClientStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientStatusCheckboxesState(prevState => {
      const newFormClientStatusState = { ...prevState };
      newFormClientStatusState[e.target.value as ClientStatus] = e.target.checked;
      return newFormClientStatusState;
    });
  };

  const getSelectedClientStatuses = useCallback((): ClientStatus[] => {
    const selectedStatuses: ClientStatus[] = [];
    clientStatuses.forEach(value => {
      if (clientStatusCheckBoxesState[value] === true) {
        selectedStatuses.push(value);
      }
    });
    return selectedStatuses;
  }, [clientStatusCheckBoxesState]);

  return {
    clientStatusCheckBoxesState,
    setClientStatusCheckboxesState,
    handleClientStatusChange,
    getSelectedClientStatuses,
    initialClientStatusCheckboxesState,
    initClientStatusCheckboxes: initCheckboxes,
  };
};
