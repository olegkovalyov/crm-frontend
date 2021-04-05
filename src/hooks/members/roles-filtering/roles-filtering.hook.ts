import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MemberRole } from '../../../interfaces/generated/globalTypes';
import { setSelectedRolesAction } from '../../../redux/members/members.actions';
import { RootStateInterface } from '../../../redux/root.reducer';
import { getSelectedMemberRolesForFilter } from '../../../redux/members/members.selector';

export const useRolesFiltering = () => {
  const dispatch = useDispatch();
  const selectedRoles = useSelector((state: RootStateInterface) => getSelectedMemberRolesForFilter(state));

  const handleRolesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedRoles = [];

    selectedRoles.forEach(role => {
      updatedRoles.push(role);
    });

    if (e.target.checked) {
      updatedRoles.push(e.target.value as MemberRole);
    } else {
      updatedRoles = selectedRoles.filter(role => role !== e.target.value);
    }
    dispatch(setSelectedRolesAction(updatedRoles));
  };

  return {
    handleRolesChange,
    selectedRoles,
  };
};


