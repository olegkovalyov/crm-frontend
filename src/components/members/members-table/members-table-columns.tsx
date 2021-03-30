import { GridCellParams, GridColDef } from '@material-ui/x-grid';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import BlockIcon from '@material-ui/icons/Block';
import React from 'react';
import { MemberRole, MemberStatus } from '../../../interfaces/generated/globalTypes';

export const columns: GridColDef[] = [
  { field: 'lastName', headerName: 'Last Name', flex: 1 },
  { field: 'firstName', headerName: 'First Name', flex: 1 },
  {
    field: 'status', headerName: 'Status', flex: 1, renderCell: (params: GridCellParams) => {
      if (params.value === MemberStatus.ACTIVE) {
        return <HowToRegIcon color='primary' />;
      }
      return <BlockIcon color='error' />;
    },
  },
  { field: 'email', headerName: 'Email', flex: 1 },
  {
    field: 'role', headerName: 'Role', flex: 1, renderCell: (params: GridCellParams) => {
      return <>{(params.value as MemberRole[]).join(', ')}</>;
    },
  },
  { field: 'licenseType', headerName: 'License', flex: 1 },
  {
    field: 'createdAt', headerName: 'Created At', flex: 1, renderCell: (params: GridCellParams) => {
      const date = new Date(params.value as string);
      return <>{date.toLocaleDateString()} {date.toLocaleTimeString()}</>;
    },
  },
  {
    field: 'updatedAt', headerName: 'Updated At', flex: 1, renderCell: (params: GridCellParams) => {
      const date = new Date(params.value as string);
      return <>{date.toLocaleDateString()} {date.toLocaleTimeString()}</>;
    },
  },
];
