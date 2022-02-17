import React, { FC, ReactElement, useEffect } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Button, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useRouter } from 'next/router';
import { XGrid } from '@material-ui/x-grid';
import { ApolloQueryResult } from '@apollo/client';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useDispatch } from 'react-redux';
import { CREATE_CLIENT_URL } from '../../src/constants/route.constants';
import { Content } from '../../src/components/layout/content/content.component';
import { useStyles } from './index.styles';
import { initializeApollo } from '../../src/http/graphql.client';
import ResponsiveDialog from '../../src/elements/responsive-dialog.component';
import { GetClients, GetClientsVariables } from '../../src/interfaces/generated/GetClients';
import { getClientsQuery } from '../../src/hooks/graphql/queries/get-clients/get-clients.query.hook';
import { ClientInterface } from '../../src/interfaces/client.interface';
import { deleteClientAction, setClientsAction } from '../../src/redux/clients/clients.actions';
import { useClientsFilter } from '../../src/hooks/clients/clients-filter/clients-filter.hook';
import { useClientsTable } from '../../src/hooks/clients/clients-table/clients-table.hook';
import { useDeleteClientMutation } from '../../src/hooks/graphql/mutations/delete-client/delete-client.mutation.hook';
import ClientsFilterContainer
  from '../../src/components/clients/clients-filter-container/clients-filter-container.component';
import Notification from '../../src/components/common/notification/notification.compontent';

interface PropTypesInterface {
  clients: ClientInterface[],
  hasError: boolean,
  errorMessage: string
}

const Clients: FC<PropTypesInterface> = (props: PropTypesInterface): ReactElement => {
  const classes = useStyles();
  const router = useRouter();
  const { clients, hasError, errorMessage } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setClientsAction(clients));
  }, []);

  const {
    searchFilterValue,
    handleSearchFilterChange,
    tableData,
  } = useClientsFilter();

  const {
    inProcessOfDeletingClient,
    deleteClientErrorMessage,
    deletedClient,
    handleDeleteClient,
  } = useDeleteClientMutation();

  const {
    columns,
    selectedClientId,
    needOpenDialog,
    handleConfirmDelete,
    handleCancelDelete,
  } = useClientsTable(handleDeleteClient);

  useEffect(() => {
    if (deletedClient) {
      dispatch(deleteClientAction(deletedClient.id));
    }
  }, [deletedClient]);

  if (hasError) {
    return (
      <>
        <Content>
          <Alert severity="error">{errorMessage}</Alert>
        </Content>
      </>
    );
  }

  return (
    <>
      <Content>
        <>
          <Notification
            hasNotification={deleteClientErrorMessage !== null}
            message={deleteClientErrorMessage}
            autoHide={true}
            type='error'
          />
          <Notification
            hasNotification={deletedClient !== null}
            message={`Client #${selectedClientId} was deleted successfully`}
            autoHide={true}
            type='success'
          />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<PersonAddIcon />}
                onClick={(e: React.MouseEvent) => {
                  router.push(CREATE_CLIENT_URL);
                }}
              >
                Create
              </Button>
            </Grid>
            <Grid item xs={12}>
              <ClientsFilterContainer
                onSearchFilterChange={handleSearchFilterChange}
                searchFilterValue={searchFilterValue}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ height: 520, width: '100%' }}>
                <XGrid
                  columnBuffer={20}
                  autoHeight={true}
                  rows={tableData}
                  columns={columns}
                  disableColumnMenu={true}
                  loading={inProcessOfDeletingClient}
                />
              </div>
              <ResponsiveDialog
                handleConfirm={handleConfirmDelete}
                handleCancel={handleCancelDelete}
                confirmButtonText='Delete'
                cancelButtonText='Cancel'
                title='Are you sure you want to delete member'
                isOpen={needOpenDialog}
                isFullScreen={false}
                inProcess={inProcessOfDeletingClient}
              />
            </Grid>
          </Grid>
        </>
      </Content>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {

  let clients: ClientInterface[] = [];
  let hasError = false;
  let errorMessage = '';
  const { accessToken } = context.req.cookies;
  if (accessToken) {
    const client = initializeApollo();
    try {
      const variables: GetClientsVariables = {
        getClientsInput: {},
      };

      const result: ApolloQueryResult<GetClients> = await client.query({
        query: getClientsQuery,
        context: {
          headers: {
            authorization: `Bearer ${accessToken} `,
          },
        },
        fetchPolicy: 'network-only',
        variables,
      });
      clients = result.data.getClients;
    } catch (e: unknown) {
      hasError = true;
      errorMessage = (e as Error).message;
    }
  }

  return {
    props: {
      clients,
      hasError,
      errorMessage,
    },
  };
};

export default Clients;

