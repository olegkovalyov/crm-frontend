import React, { FC, ReactElement } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { Button, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useRouter } from 'next/router';
import { XGrid } from '@material-ui/x-grid';
import { ApolloQueryResult } from '@apollo/client';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { CREATE_MEMBER_URL } from '../../src/constants/route.constants';
import { Content } from '../../src/components/layout/content/content.component';
import { MemberInterface } from '../../src/interfaces/member.interface';
import {
  getMembersQuery,
} from '../../src/hooks/graphql/queries/get-members/get-members.query.hook';
import { useStyles } from './index.styles';
import { initializeApollo } from '../../src/http/graphql.client';
import { GetMembers, GetMembersVariables } from '../../src/interfaces/generated/GetMembers';
import { useMemberFilter } from '../../src/hooks/ui/member-filter/member-filter.hook';
import MembersTableFilter from '../../src/components/members/members-table-filter/members-table-filter.component';
import { columns } from '../../src/components/members/members-table/members-table-columns';

interface PropTypesInterface {
  members: MemberInterface[],
  hasError: boolean,
  errorMessage: string
}

const Members: FC<PropTypesInterface> = (props: PropTypesInterface): ReactElement => {
  const classes = useStyles();
  const router = useRouter();
  const { members, hasError, errorMessage } = props;

  const {
    selectedRoles,
    handleFilterRoleChange,
    selectedStatuses,
    handleFilterStatusChange,
    searchFilterValue,
    handleSearchFilterChange,
    tableData,
  } = useMemberFilter(members);

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
            <MembersTableFilter
              selectedRoles={selectedRoles}
              handleRoleChange={handleFilterRoleChange}
              selectedStatuses={selectedStatuses}
              handleStatusChange={handleFilterStatusChange}
              searchFilterValue={searchFilterValue}
              handleSearchFilterChange={handleSearchFilterChange}
            />
          </Grid>
          <Grid item xs={12}>
            <XGrid
              className={classes.tableContainer}
              rows={tableData}
              columns={columns}
              disableColumnMenu={true}
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

