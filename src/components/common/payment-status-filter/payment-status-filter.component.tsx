import React, { FC, ReactElement } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { paymentStatuses } from '../../../constants/client.constants';
import { PaymentStatusCheckBoxesStateType } from '../../../interfaces/client.interface';
import { PaymentStatus } from '../../../interfaces/generated/globalTypes';

interface PropTypesInterface {
  paymentStatusCheckBoxesState: PaymentStatusCheckBoxesStateType,
  onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PaymentStatusFilter: FC<PropTypesInterface> = (props): ReactElement => {
  const { paymentStatusCheckBoxesState, onStatusChange } = props;
  const clientStatusesJsx = paymentStatuses.map((value) => {
    let label = '';
    switch (value) {
      case PaymentStatus.PAID:
        label = 'Paid';
        break;
      case PaymentStatus.NOT_PAID:
        label = 'Not paid';
        break;
      case PaymentStatus.REFUNDED:
        label = 'Refunded';
        break;
      default:
        break;
    }
    return <FormControlLabel
      key={value}
      value={value}
      control={<Checkbox color="primary" checked={paymentStatusCheckBoxesState[value]} onChange={onStatusChange} />}
      label={label}
      labelPlacement="start"
    />;
  });

  return (
    <>
      {clientStatusesJsx}
    </>
  );
};

export default PaymentStatusFilter;
