import React, { useState } from 'react';
import { MemberRole } from '../../../interfaces/generated/globalTypes';

export const useRolesEdit = () => {
  const [selectedRoles, setSelectedRoles] = useState<MemberRole[]>([]);
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
    setSelectedRoles(updatedRoles);
  };

  return {
    handleRolesChange,
    selectedRoles,
  };
};


