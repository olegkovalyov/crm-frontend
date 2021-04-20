import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MemberStatus } from '../../../interfaces/generated/globalTypes';
import { setMemberStatusOptionsForFilterAction } from '../../../redux/members/members.actions';
import { RootStateInterface } from '../../../redux/root.reducer';
import { getMemberStatusOptionsForFilter } from '../../../redux/members/members.selector';

export const useStatusFilter = () => {
  const dispatch = useDispatch();
  const selectedStatusOptions = useSelector((state: RootStateInterface) => getMemberStatusOptionsForFilter(state));

  const handleStatusOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedStatuses = [];

    selectedStatusOptions.forEach(role => {
      updatedStatuses.push(role);
    });

    if (e.target.checked) {
      updatedStatuses.push(e.target.value as MemberStatus);
    } else {
      updatedStatuses = selectedStatusOptions.filter(status => status !== e.target.value);
    }
    dispatch(setMemberStatusOptionsForFilterAction(updatedStatuses));
  };

  return {
    handleStatusOptionsChange,
    selectedStatusOptions,
  };
};


