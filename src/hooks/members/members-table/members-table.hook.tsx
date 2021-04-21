import { GridCellParams, GridColDef } from '@material-ui/x-grid';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import BlockIcon from '@material-ui/icons/Block';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import React, { useState } from 'react';
import { MemberRole, MemberStatus } from '../../../interfaces/generated/globalTypes';
import { EDIT_MEMBER_URL } from '../../../constants/route.constants';

export const useMembersTable = (deleteMemberHandler) => {

  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [needOpenDialog, setNeedOpenDialog] = useState(false);


  const handleCancelDelete = () => {
    setNeedOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    setNeedOpenDialog(false);
    await deleteMemberHandler(selectedMemberId);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', flex: 1 },
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
      field: 'role',
      headerName: 'Role',
      flex: 1,
      renderCell: (params: GridCellParams) => <>{(params.value as MemberRole[]).join(', ')}</>,
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
    {
      field: 'actions', headerName: 'Actions', width: 170, renderCell: (params: GridCellParams) => {
        const url = EDIT_MEMBER_URL.replace('[id]', String(params.value));
        return <>
          <Button
            color='primary'
          >
            <Link href={url}>
              Edit
            </Link>
          </Button>
          <Button
            color='secondary'
            onClick={(e) => {
              setSelectedMemberId(params.value as number);
              setNeedOpenDialog(true);
            }}
          >
            Delete
          </Button>
        </>;
      },
    },
  ];

  return {
    columns,
    selectedMemberId,
    setSelectedMemberId,
    needOpenDialog,
    setNeedOpenDialog,
    handleConfirmDelete,
    handleCancelDelete,
  };
};