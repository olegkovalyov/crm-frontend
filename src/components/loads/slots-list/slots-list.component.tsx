// Core
import React, { FC, ReactElement } from 'react';
import MaterialTable from 'material-table';
import Icon from '@material-ui/core/Icon';
import { SlotInterface } from '../../../interfaces/load.interface';
import { useTableColumnRender } from '../../../hooks/ui/clients-table-render/clients-table-render.hook';
import { useStyles } from './slots-list.styles';

interface PropTypesInterface {
  slots: SlotInterface[] | null;
  isLoading: boolean;
  handleDeleteSlot: (slotId: number) => Promise<void>,
}

const SlotList: FC<PropTypesInterface> = (props): ReactElement => {
  const { isLoading, handleDeleteSlot } = props;
  const classes = useStyles();
  const slots = props.slots ? props.slots.map(slot => {
    return {
      id: slot.id,
      firstName: slot.firstName,
      lastName: slot.lastName,
      role: slot.role,
      description: slot.description,
    };
  }) : [];

  const {
    renderSlotRole,
  } = useTableColumnRender();

  const columns = [
    {
      title: '',
      field: '',
      render: (slot: SlotInterface) => {
        return <Icon
          className={classes.deleteSlotButton}
          color="primary"
          onClick={() => {
            handleDeleteSlot(slot.id);
          }}
        >remove_circle</Icon>;
      },
    },
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    { role: 'Role', field: 'role', render: renderSlotRole },
  ];

  return (
    <MaterialTable
      isLoading={isLoading}
      title="Assigned"
      columns={columns}
      data={slots}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
};

export default SlotList;
