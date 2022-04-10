import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateInterface } from '../../../redux/root.reducer';
import { getClientStatusOptionsForFilter } from '../../../redux/clients/clients.selector';
import { setClientStatusOptionsAction } from '../../../redux/clients/clients.actions';
import { ClientStatus } from '../../../interfaces/generated/globalTypes';

export const useStatusFilter = () => {
  const dispatch = useDispatch();
  const selectedStatusOptions = useSelector((state: RootStateInterface) => getClientStatusOptionsForFilter(state));

  const handleStatusOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedStatuses: ClientStatus[] = [];

    selectedStatusOptions.forEach(role => {
      updatedStatuses.push(role);
    });

    if (e.target.checked) {
      updatedStatuses.push(e.target.value as ClientStatus);
    } else {
      updatedStatuses = selectedStatusOptions.filter(status => status !== e.target.value);
    }
    dispatch(setClientStatusOptionsAction(updatedStatuses));
  };

  return {
    handleStatusOptionsChange,
    selectedStatusOptions,
  };
};


