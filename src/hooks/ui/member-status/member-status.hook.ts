import React, { useState } from 'react';
import { MemberStatus } from '../../../interfaces/generated/globalTypes';

export const useMemberStatus = () => {
  const [selectedStatuses, setSelectedStatuses] = useState<MemberStatus[]>([]);


  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedStatuses = [];

    selectedStatuses.forEach(role => {
      updatedStatuses.push(role);
    });

    if (e.target.checked) {
      updatedStatuses.push(e.target.value as MemberStatus);
    } else {
      updatedStatuses = selectedStatuses.filter(status => status !== e.target.value);
    }
    setSelectedStatuses(updatedStatuses);
  };

  return {
    handleStatusChange,
    selectedStatuses,
  };
};


