import { GridCellParams, GridColDef } from '@material-ui/x-grid';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import React, { useState } from 'react';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckIcon from '@material-ui/icons/Check';
import { ClientRole, ClientStatus, Gender } from '../../../interfaces/generated/globalTypes';
import { EDIT_CLIENT_URL } from '../../../constants/route.constants';

export const useClientsTable = (deleteClientHandler) => {

  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [needOpenDialog, setNeedOpenDialog] = useState(false);

  const handleCancelDelete = () => {
    setNeedOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    setNeedOpenDialog(false);
    await deleteClientHandler(selectedClientId);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 50 },
    {
      field: 'role', headerName: 'Role', width: 200, renderCell: (params: GridCellParams) => {
        const value = params.value as ClientRole;
        let output = '';
        if (value === ClientRole.TANDEM) {
          output = 'TM Passenger';
        } else if (value === ClientRole.AS_A_PASSENGER) {
          output = 'Passenger';
        } else if (value === ClientRole.STATIC_LINE) {
          output = 'Static line';
        }
        return <>{output}</>;
      },
    },
    {
      field: 'status', headerName: 'Status', width: 100, renderCell: (params: GridCellParams) => {
        const value = params.value as ClientStatus;
        let output = '';
        if (value === ClientStatus.PENDING) {
          output = 'Active';
        }  else if (value === ClientStatus.PROCESSED) {
          output = 'Processed';
        }
        return <>{output}</>;
      },
    },
    { field: 'lastName', headerName: 'Last Name', width: 200 },
    { field: 'firstName', headerName: 'First Name', width: 200 },
    { field: 'certificate', headerName: 'Certificate', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'gender', headerName: 'Gender', width: 100, renderCell: (params: GridCellParams) => {
        const output = (params.value as Gender === Gender.MALE) ? 'M' : 'F';
        return <>{output}</>;
      },
    },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'weight', headerName: 'Weight', width: 100 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    {
      field: 'withCameraman', headerName: 'Cameraman', width: 100, renderCell: (params: GridCellParams) => {
        return params.value ? <CheckIcon color='primary' /> : <RemoveIcon color='secondary' />;
      },
    },
    {
      field: 'withHandCameraVideo', headerName: 'Hand video', width: 100, renderCell: (params: GridCellParams) => {
        return params.value ? <CheckIcon color='primary' /> : <RemoveIcon color='secondary' />;
      },
    },
    {
      field: 'createdAt', headerName: 'Created At', width: 200, renderCell: (params: GridCellParams) => {
        if (!params.value) {
          return <>-</>;
        }
        const date = new Date(params.value as string);
        return <>{date.toLocaleDateString()} {date.toLocaleTimeString()}</>;
      },
    },
    {
      field: 'updatedAt', headerName: 'Updated At', width: 200, renderCell: (params: GridCellParams) => {
        if (!params.value) {
          return <>-</>;
        }
        const date = new Date(params.value as string);
        return <>{date.toLocaleDateString()} {date.toLocaleTimeString()}</>;
      },
    },
    {
      field: 'processedAt', headerName: 'Processed At', width: 200, renderCell: (params: GridCellParams) => {
        if (!params.value) {
          return <>-</>;
        }
        const date = new Date(params.value as string);
        return <>{date.toLocaleDateString()} {date.toLocaleTimeString()}</>;
      },
    },
    {
      field: 'actions', headerName: 'Actions', width: 200, renderCell: (params: GridCellParams) => {
        const url = EDIT_CLIENT_URL.replace('[id]', String(params.value));
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
              setSelectedClientId(params.value as number);
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
    selectedClientId,
    setSelectedClientId,
    needOpenDialog,
    setNeedOpenDialog,
    handleConfirmDelete,
    handleCancelDelete,
  };
};