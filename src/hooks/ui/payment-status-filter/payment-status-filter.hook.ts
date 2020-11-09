import React, { useState, useCallback } from 'react';

import { paymentStatuses } from '../../../constants/client.constants';
import { PaymentStatusCheckBoxesStateType } from '../../../interfaces/client.interface';
import { PaymentStatus } from '../../../interfaces/generated/globalTypes';

export const usePaymentStatusFilter = () => {
  const initialPaymentStatusCheckboxesState: PaymentStatusCheckBoxesStateType = {
    PAID: true,
    NOT_PAID: true,
    REFUNDED: true,
  };
  const [paymentStatusCheckBoxesState, setPaymentStatusCheckboxesState] = useState<PaymentStatusCheckBoxesStateType>(initialPaymentStatusCheckboxesState);

  const initCheckboxes = (statuses: PaymentStatus[]) => {
    paymentStatuses.forEach((value) => {
      initialPaymentStatusCheckboxesState[value] = statuses.includes(value);
    });
    setPaymentStatusCheckboxesState(initialPaymentStatusCheckboxesState);
  };

  const handlePaymentStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentStatusCheckboxesState(prevState => {
      const newFormPaymentStatusState = { ...prevState };
      newFormPaymentStatusState[e.target.value as PaymentStatus] = e.target.checked;
      return newFormPaymentStatusState;
    });
  };

  const getSelectedPaymentStatuses = useCallback((): PaymentStatus[] => {
    const selectedStatuses: PaymentStatus[] = [];
    paymentStatuses.forEach(value => {
      if (paymentStatusCheckBoxesState[value] === true) {
        selectedStatuses.push(value);
      }
    });
    return selectedStatuses;
  }, [paymentStatusCheckBoxesState]);

  return {
    paymentStatusCheckBoxesState,
    setPaymentStatusCheckboxesState,
    handlePaymentStatusChange,
    getSelectedPaymentStatuses,
    initialPaymentStatusCheckboxesState,
    initPaymentStatusCheckboxes: initCheckboxes,
  };
};
