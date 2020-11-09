import React, { FC, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Grid,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useStyles } from './clients-table-container.styles';
import { CREATE_CLIENT_URL } from '../../../constants/route.constants';
import { useGetClientsQuery } from '../../../hooks/graphql/queries/get-clients/get-clients.query.hook';
import ClientsTable from '../clients-table/clients-table.component';
import ClientsTableFilter from '../clients-table-filter/clients-table-filter.component';
import { useClientStatusFilter } from '../../../hooks/ui/client-status-filter/client-status-filter.hook';
import { usePaymentStatusFilter } from '../../../hooks/ui/payment-status-filter/payment-status-filter.hook';
import { useClientCreatedFilter } from '../../../hooks/ui/client-created-filter/client-created-filter.hook';


const ClientsTableContainer: FC = (props): ReactElement => {

  const classes = useStyles();
  const history = useHistory();

  const {
    getClientsAsync,
    clients,
    areClientsLoading,
    getClientsErrorMessage,
  } = useGetClientsQuery();

  const {
    clientStatusCheckBoxesState,
    handleClientStatusChange,
    getSelectedClientStatuses,
    initClientStatusCheckboxes,
  } = useClientStatusFilter();

  const {
    createdDateMin,
    createdDateMax,
    onCreatedDateMinChange,
    onCreatedDateMaxChange,
  } = useClientCreatedFilter();

  const {
    paymentStatusCheckBoxesState,
    handlePaymentStatusChange,
    getSelectedPaymentStatuses,
    initPaymentStatusCheckboxes,
  } = usePaymentStatusFilter();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<PersonAddIcon />}
            onClick={(e: React.MouseEvent) => {
              history.push(CREATE_CLIENT_URL);
            }}
          >
            Create
          </Button>
        </Grid>
        <Grid item xs={9}>
          <ClientsTableFilter
            clientStatusCheckBoxesState={clientStatusCheckBoxesState}
            paymentStatusCheckBoxesState={paymentStatusCheckBoxesState}
            handleClientStatusChange={handleClientStatusChange}
            handlePaymentStatusChange={handlePaymentStatusChange}
            initClientStatusCheckboxes={initClientStatusCheckboxes}
            initPaymentStatusCheckboxes={initPaymentStatusCheckboxes}
            getSelectedClientStatuses={getSelectedClientStatuses}
            getSelectedPaymentStatuses={getSelectedPaymentStatuses}
            createdDateMin={createdDateMin}
            onCreatedDateMinChange={onCreatedDateMinChange}
            createdDateMax={createdDateMax}
            onCreatedDateMaxChange={onCreatedDateMaxChange}
            updateDataAsync={getClientsAsync}
          />
        </Grid>
        <Grid item xs={12}>
          <ClientsTable
            getClientsAsync={getClientsAsync}
            loading={areClientsLoading}
            clients={clients}
            errorMessage={getClientsErrorMessage}
            getSelectedClientStatuses={getSelectedClientStatuses}
            getSelectedPaymentStatuses={getSelectedPaymentStatuses}
            createdDateMin={createdDateMin}
            createdDateMax={createdDateMax}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ClientsTableContainer;
