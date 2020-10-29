import React, { FC, ReactElement } from 'react';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { PaymentStatus } from '../../../interfaces/generated/globalTypes';

interface PropTypesInterface {
  paymentStatus: PaymentStatus,
  onPaymentStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  className?: string,
}

const ClientPaymentOptions: FC<PropTypesInterface> = React.memo((props): ReactElement => {

  const {
    paymentStatus,
    onPaymentStatusChange,
  } = props;

  const className = props.className ?? '';

  return (
    <FormControl component="fieldset" className={className}>
      <FormLabel component="legend">Payment</FormLabel>
      <RadioGroup
        aria-label="payment-status"
        name="payment-status"
        value={paymentStatus}
        onChange={onPaymentStatusChange}
      >
        <FormControlLabel
          value={PaymentStatus.NOT_PAID}
          control={<Radio color='secondary' />}
          label="Not paid"
        />
        <FormControlLabel
          value={PaymentStatus.PAID}
          control={<Radio color='primary' />}
          label="Paid"
        />
        <FormControlLabel
          value={PaymentStatus.REFUNDED}
          control={<Radio color='secondary' />}
          label="Refunded"
        />
      </RadioGroup>
    </FormControl>
  );
});

export default ClientPaymentOptions;
