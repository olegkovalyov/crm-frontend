import React, { FC, ReactElement, useEffect, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Button, Grid, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useRouter } from 'next/router';
import { XGrid } from '@material-ui/x-grid';
import { ApolloQueryResult } from '@apollo/client';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useDispatch } from 'react-redux';
import { CREATE_MEMBER_URL } from '../../src/constants/route.constants';
import { Content } from '../../src/components/layout/content/content.component';
import { MemberInterface } from '../../src/interfaces/member.interface';
import {
  getMembersQuery,
} from '../../src/hooks/graphql/queries/get-members/get-members.query.hook';
import { useStyles } from './index.styles';
import { initializeApollo } from '../../src/http/graphql.client';
import { GetMembers, GetMembersVariables } from '../../src/interfaces/generated/GetMembers';
import { useMembersFilter } from '../../src/hooks/members/members-filter/members-filter.hook';
import MembersFilterContainer
  from '../../src/components/members/members-filter-container/members-filter-container.component';
import { useDeleteMemberMutation } from '../../src/hooks/graphql/mutations/delete-member/delete-member.mutation.hook';
import ResponsiveDialog from '../../src/elements/responsive-dialog.component';
import { useMembersTable } from '../../src/hooks/members/members-table/members-table.hook';
import { useSnackbar } from '../../src/hooks/ui/snackbar/snackbar.hook';
import { setMembersAction } from '../../src/redux/members/members.actions';

interface PropTypesInterface {
  members: MemberInterface[],
  hasError: boolean,
  errorMessage: string
}

const Members: FC<PropTypesInterface> = (props: PropTypesInterface): ReactElement => {
  const classes = useStyles();
  const router = useRouter();
  const { members, hasError, errorMessage } = props;

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackBarSeverity, setSnackbarSeverity] = useState<'success' | 'warning'>('success');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMembersAction(members));
  }, []);

  const {
    searchFilterValue,
    handleSearchFilterChange,
    tableData,
  } = useMembersFilter();

  const {
    inProcessOfDeletingMember,
    deleteMemberErrorMessage,
    deletedMemberData,
    handleDeleteMember,
  } = useDeleteMemberMutation();

  const {
    columns,
    selectedMemberId,
    needOpenDialog,
    handleConfirmDelete,
    handleCancelDelete
  } = useMembersTable(handleDeleteMember);

  const {
    isOpenedSnackbar,
    handleOpenSnackBar,
    handleCloseSnackBar,
  } = useSnackbar();

  useEffect(() => {
    if (deletedMemberData) {
      setSnackbarSeverity('success');
      setSnackbarMessage(`Member #${selectedMemberId} was deleted successfully`);
      handleOpenSnackBar();
    } else if (deleteMemberErrorMessage.length) {
      setSnackbarSeverity('warning');
      setSnackbarMessage(`Failed to delete #${selectedMemberId} member: ${deleteMemberErrorMessage}`);
      handleOpenSnackBar();
    }
  }, [deletedMemberData, deleteMemberErrorMessage]);


  if (hasError) {
    return (
      <>
        <Content>
          <Alert severity="error">{errorMessage}</Alert>
        </Content></>
    );
  }

  return (
    <>
      <Content>
        <Grid container spacing={3}>
          <Snackbar open={isOpenedSnackbar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
            <Alert onClose={handleCloseSnackBar} severity={snackBarSeverity}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<PersonAddIcon />}
              onClick={(e: React.MouseEvent) => {
                router.push(CREATE_MEMBER_URL);
              }}
            >
              Create
            </Button>
          </Grid>
          <Grid item xs={12}>
            <MembersFilterContainer
              searchFilterValue={searchFilterValue}
              onSearchFilterChange={handleSearchFilterChange}
            />
          </Grid>
          <Grid item xs={12}>
            <XGrid
              autoHeight={true}
              rows={tableData}
              columns={columns}
              disableColumnMenu={true}
              loading={inProcessOfDeletingMember}
            />
            <ResponsiveDialog
              handleConfirm={handleConfirmDelete}
              handleCancel={handleCancelDelete}
              confirmButtonText='Delete'
              cancelButtonText='Cancel'
              title='Are you sure you want to delete member'
              isOpen={needOpenDialog}
              isFullScreen={false}
              inProcess={inProcessOfDeletingMember}
            />
          </Grid>
        </Grid>
      </Content>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {

  let members: MemberInterface[] = [];
  let hasError = false;
  let errorMessage = '';
  const { accessToken } = context.req.cookies;
  if (accessToken) {
    const client = initializeApollo();
    try {
      const variables: GetMembersVariables = {
        getMembersFilter: {
          statuses: [],
          roles: [],
        },
      };

      const result: ApolloQueryResult<GetMembers> = await client.query({
        query: getMembersQuery,
        context: {
          headers: {
            authorization: `Bearer ${accessToken} `,
          },
        },
        fetchPolicy: 'network-only',
        variables,
      });
      members = result.data.getMembers;
    } catch (e: unknown) {
      hasError = true;
      errorMessage = (e as Error).message;
    }
  }

  return {
    props: {
      members,
      hasError,
      errorMessage,
    },
  };
};

export default Members;

