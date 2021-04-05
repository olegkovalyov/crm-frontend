import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MemberStatus } from '../../../interfaces/generated/globalTypes';
import { setSelectedStatusesAction } from '../../../redux/members/members.actions';
import { RootStateInterface } from '../../../redux/root.reducer';
import { getSelectedMemberStatusesForFilter } from '../../../redux/members/members.selector';

export const useStatusesFiltering = () => {
  const dispatch = useDispatch();
  const selectedStatuses = useSelector((state: RootStateInterface) => getSelectedMemberStatusesForFilter(state));

  const handleStatusesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedStatuses = [];

    selectedStatuses.forEach(role => {
      updatedStatuses.push(role);
    });

    if (e.target.checked) {
      updatedStatuses.push(e.target.value as MemberStatus);
    } else {
      updatedStatuses = selectedStatuses.filter(status => status !== e.target.value);
    }
    dispatch(setSelectedStatusesAction(updatedStatuses));
  };

  return {
    handleStatusesChange,
    selectedStatuses,
  };
};


