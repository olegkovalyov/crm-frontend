import React, { FC, ReactElement, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux';
import { useGetUsersRequest } from '../../hooks/users-request/users-request.hook';
import { GetUsers_getUsers } from '../../interfaces/generated/GetUsers';
import { IRootState } from '../../redux/root.reducer';
import { getAllUsers } from '../../redux/users/users.selector';


const UsersTable: FC = (props): ReactElement => {

  const {
    getUsersAsync,
  } = useGetUsersRequest();

  useEffect(() => {
    getUsersAsync();
  }, [getUsersAsync]);


  const columns = [
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'Email', field: 'email' },
    { title: 'Role', field: 'role' },
    { title: 'License', field: 'licenseType' },
    { title: 'Created At', field: 'createdAt' },
    { title: 'Updated At', field: 'updatedAt' },
  ];

  const users = useSelector((state: IRootState) => getAllUsers(state));

  return (
    <MaterialTable
      title="Users"
      columns={columns}
      data={users}
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit User',
          onClick: (event, rowData) => alert(`You clicked to edit ${(rowData as GetUsers_getUsers).firstName}`),
        },
      ]}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
};

export default UsersTable;
