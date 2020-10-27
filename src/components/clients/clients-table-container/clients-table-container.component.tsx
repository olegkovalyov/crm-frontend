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


const ClientsTableContainer: FC = (props): ReactElement => {

  const classes = useStyles();
  const history = useHistory();

  const {
    getClientsAsync,
    clients,
    areClientsLoading,
    getClientsErrorMessage,
  } = useGetClientsQuery();

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
        <Grid item xs={12}>
          <ClientsTable
            getClientsAsync={getClientsAsync}
            loading={areClientsLoading}
            clients={clients}
            errorMessage={getClientsErrorMessage}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ClientsTableContainer;
