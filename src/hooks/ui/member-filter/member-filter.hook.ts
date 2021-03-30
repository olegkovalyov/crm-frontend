import React, { useEffect, useState } from 'react';
import { GridRowsProp } from '@material-ui/x-grid';
import { MemberRole, MemberStatus } from '../../../interfaces/generated/globalTypes';
import { MemberInterface } from '../../../interfaces/member.interface';

export const useMemberFilter = (members: MemberInterface[]) => {
  const [tableData, setTableData] = useState<GridRowsProp>(members);
  const [selectedRoles, setSelectedRoles] = useState<MemberRole[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<MemberStatus[]>([]);
  const [searchFilterValue, setSearchFilterValue] = useState('');

  useEffect(() => {
    const filteredData = applyFilter(members);
    const rows = filteredData.map((member) => ({
      id: member.id,
      firstName: member.firstName,
      lastName: member.lastName,
      status: member.status,
      email: member.email,
      role: member.roles,
      licenseType: member.licenseType,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
    }));
    setTableData(rows);
  }, [selectedRoles, selectedStatuses, searchFilterValue]);

  const handleFilterRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleFilterStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilterValue(e.target.value);
  };

  const applyFilter = (members: MemberInterface[]): MemberInterface[] => members.filter(member => {
    if (selectedRoles.length) {
      let shouldPass = false;
      selectedRoles.forEach(role => {
        if (member.roles.includes(role)) {
          shouldPass = true;
        }
      });
      return shouldPass;
    }
    return true;
  }).filter(member => {
    if (selectedStatuses.length) {
      let shouldPass = false;
      selectedStatuses.forEach(status => {
        if (member.status === status) {
          shouldPass = true;
        }
      });
      return shouldPass;
    }
    return true;
  }).filter(member => {
    const value = searchFilterValue.trim();
    if (value !== '') {
      let shouldPass = false;
      if (member.firstName.includes(value)
        || member.lastName.includes(value)
      ) {
        shouldPass = true;
      }
      return shouldPass;
    }
    return true;
  });

  return {
    handleFilterRoleChange,
    selectedRoles,
    handleFilterStatusChange,
    selectedStatuses,
    applyFilter,
    searchFilterValue,
    handleSearchFilterChange,
    tableData,
  };
};


