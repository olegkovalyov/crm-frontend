import React, { FC, ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux';
import { useGetUsersRequest } from '../../hooks/users-request/users-request.hook';
import { GetUsers_getUsers } from '../../interfaces/generated/GetUsers';
import { IRootState } from '../../redux/root.reducer';
import { getAllUsers } from '../../redux/users/users.selector';
import { url } from '../../constants/url';


const UsersTable: FC = (props): ReactElement => {

  const history = useHistory();
  const {
    getUsersAsync,
  } = useGetUsersRequest();

  useEffect(() => {
    getUsersAsync();
  }, []);

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
          onClick: (event, rowData) => {
            history.push(`${url.users}/${(rowData as GetUsers_getUsers).id}`);
          },
        },
      ]}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
};

export default UsersTable;
