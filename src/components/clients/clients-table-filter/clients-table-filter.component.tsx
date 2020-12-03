import React, { FC, ReactElement, useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormGroup,
  FormLabel, Grid,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  ClientStatusCheckBoxesStateType,
  PaymentStatusCheckBoxesStateType,
} from '../../../interfaces/client.interface';
import { ClientStatus, PaymentStatus } from '../../../interfaces/generated/globalTypes';
import { clientStatuses, paymentStatuses } from '../../../constants/client.constants';
import ClientStatusFilter from '../../common/client-status-filter/client-status-filter.component';
import PaymentStatusFilter from '../../common/payment-status-filter/payment-status-filter.component';

interface PropTypesInterface {
  clientStatusCheckBoxesState: ClientStatusCheckBoxesStateType,
  paymentStatusCheckBoxesState: PaymentStatusCheckBoxesStateType,
  handleClientStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handlePaymentStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  initClientStatusCheckboxes: (statuses: ClientStatus[]) => void,
  initPaymentStatusCheckboxes: (roles: PaymentStatus[]) => void,
  getSelectedClientStatuses: () => ClientStatus[],
  getSelectedPaymentStatuses: () => PaymentStatus[],
  createdDateMin: Date | null,
  onCreatedDateMinChange: (date: Date | null) => void,
  createdDateMax: Date | null,
  onCreatedDateMaxChange: (date: Date | null) => void,
  updateDataAsync: (
    clientStatuses: ClientStatus[] | null,
    paymentStatuses: PaymentStatus[] | null,
    isAssigned: boolean |null,
    createdAtMin: Date | null,
    createdAtMax: Date | null,
  ) => void,
}

const ClientsTableFilter: FC<PropTypesInterface> = (props): ReactElement => {

  const {
    updateDataAsync,
    clientStatusCheckBoxesState,
    initClientStatusCheckboxes,
    handleClientStatusChange,
    getSelectedClientStatuses,
    paymentStatusCheckBoxesState,
    initPaymentStatusCheckboxes,
    handlePaymentStatusChange,
    getSelectedPaymentStatuses,
    createdDateMin,
    onCreatedDateMinChange,
    createdDateMax,
    onCreatedDateMaxChange,
  } = props;

  useEffect(() => {
    initClientStatusCheckboxes(clientStatuses);
    initPaymentStatusCheckboxes(paymentStatuses);
  }, []); // eslint-disable-line

  useEffect(() => {
    updateDataAsync(
      getSelectedClientStatuses(),
      getSelectedPaymentStatuses(),
      null,
      createdDateMin,
      createdDateMax,
    );
  }, [// eslint-disable-line
    getSelectedClientStatuses, // eslint-disable-line
    getSelectedPaymentStatuses,// eslint-disable-line
    createdDateMin,// eslint-disable-line
    createdDateMax,// eslint-disable-line
  ]); // eslint-disable-line

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant='button'>Filter</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Client Status:</FormLabel>
              <FormGroup>
                <ClientStatusFilter
                  statusCheckBoxesState={clientStatusCheckBoxesState}
                  onStatusChange={handleClientStatusChange}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Payment Status:</FormLabel>
              <FormGroup>
                <PaymentStatusFilter
                  paymentStatusCheckBoxesState={paymentStatusCheckBoxesState}
                  onStatusChange={handlePaymentStatusChange}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                margin="normal"
                id="date-picker-dialog"
                format="dd.MM.yyyy"
                label='Select min date'
                value={createdDateMin}
                onChange={onCreatedDateMinChange}
                inputVariant='outlined'
                fullWidth
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                margin="normal"
                id="date-picker-dialog"
                format="dd.MM.yyyy"
                label='Select max date'
                value={createdDateMax}
                onChange={onCreatedDateMaxChange}
                inputVariant='outlined'
                fullWidth
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
export default ClientsTableFilter;
