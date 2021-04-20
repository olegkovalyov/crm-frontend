import React, { useEffect, useState } from 'react';
import { GridRowsProp } from '@material-ui/x-grid';
import { useSelector } from 'react-redux';
import { MemberInterface } from '../../../interfaces/member.interface';
import { RootStateInterface } from '../../../redux/root.reducer';
import {
  getMembers,
  getMemberRolesOptionsForFilter,
  getMemberStatusOptionsForFilter,
} from '../../../redux/members/members.selector';

export const useMembersFilter = () => {

  const members = useSelector((state: RootStateInterface) => getMembers(state));
  const selectedRolesOptions = useSelector((state: RootStateInterface) => getMemberRolesOptionsForFilter(state));
  const selectedStatusOptions = useSelector((state: RootStateInterface) => getMemberStatusOptionsForFilter(state));

  const [tableData, setTableData] = useState<GridRowsProp>(members);
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
      actions: member.id,
    }));
    setTableData(rows);
  }, [selectedRolesOptions, selectedStatusOptions, searchFilterValue, members]);

  const handleSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilterValue(e.target.value);
  };

  const applyFilter = (data: MemberInterface[]): MemberInterface[] => data.filter(member => {
    if (selectedRolesOptions.length) {
      let shouldPass = false;
      selectedRolesOptions.forEach(role => {
        if (member.roles.includes(role)) {
          shouldPass = true;
        }
      });
      return shouldPass;
    }
    return true;
  }).filter(member => {
    if (selectedStatusOptions.length) {
      let shouldPass = false;
      selectedStatusOptions.forEach(status => {
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
    selectedRolesOptions,
    selectedStatuses: selectedStatusOptions,
    applyFilter,
    searchFilterValue,
    handleSearchFilterChange,
    tableData,
  };
};


