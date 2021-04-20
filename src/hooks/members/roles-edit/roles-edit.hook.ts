import React, { useState } from 'react';
import { MemberRole } from '../../../interfaces/generated/globalTypes';

export const useRolesEdit = () => {
  const [selectedRolesOptions, setSelectedRolesOptions] = useState<MemberRole[]>([]);
  const handleRolesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedRoles = [];

    selectedRolesOptions.forEach(role => {
      updatedRoles.push(role);
    });

    if (e.target.checked) {
      updatedRoles.push(e.target.value as MemberRole);
    } else {
      updatedRoles = selectedRolesOptions.filter(role => role !== e.target.value);
    }
    setSelectedRolesOptions(updatedRoles);
  };

  return {
    handleRolesChange,
    selectedRolesOptions,
    setSelectedRolesOptions
  };
};


