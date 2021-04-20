import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MemberRole } from '../../../interfaces/generated/globalTypes';
import { setMemberRolesOptionsForFilterAction } from '../../../redux/members/members.actions';
import { RootStateInterface } from '../../../redux/root.reducer';
import { getMemberRolesOptionsForFilter } from '../../../redux/members/members.selector';

export const useRolesFilter = () => {
  const dispatch = useDispatch();
  const selectedRolesOptions = useSelector((state: RootStateInterface) => getMemberRolesOptionsForFilter(state));

  const handleRolesOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedRoles = [];

    selectedRolesOptions.forEach(role => {
      updatedRoles.push(role);
    });

    if (e.target.checked) {
      updatedRoles.push(e.target.value as MemberRole);
    } else {
      updatedRoles = selectedRolesOptions.filter(role => role !== e.target.value);
    }
    dispatch(setMemberRolesOptionsForFilterAction(updatedRoles));
  };

  return {
    handleRolesOptionsChange,
    selectedRolesOptions,
  };
};


