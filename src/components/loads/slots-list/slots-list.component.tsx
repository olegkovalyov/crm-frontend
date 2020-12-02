// Core
import React, { FC, ReactElement } from 'react';
import MaterialTable from 'material-table';
import { SlotInterface } from '../../../interfaces/load.interface';

interface PropTypesInterface {
  slots: SlotInterface[] | null;
  isLoading: boolean;
}

const SlotList: FC<PropTypesInterface> = (props): ReactElement => {
  const { isLoading } = props;
  const slots = props.slots ? props.slots.map(slot => {
    return {
      id: slot.id,
      firstName: slot.firstName,
      lastName: slot.lastName,
      role: slot.role,
      description: slot.description,
    };
  }) : [];

  const columns = [
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
  ];

  return (
    <MaterialTable
      isLoading={isLoading}
      title="Clients"
      columns={columns}
      data={slots}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
};

export default SlotList;
