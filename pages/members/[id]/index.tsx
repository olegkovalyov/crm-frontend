import React, { FC, ReactElement, useEffect } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { ApolloQueryResult } from '@apollo/client';
import Alert from '@material-ui/lab/Alert';
import { useMemberFormValidation } from '../../../src/hooks/members/member-form-validation/member-form-validation.hook';
import { useCreateMemberMutation } from '../../../src/hooks/graphql/mutations/create-member/create-member.mutation.hook';
import MemberForm from '../../../src/components/members/member-form/member-form.component';
import { MemberStatus } from '../../../src/interfaces/generated/globalTypes';
import { Content } from '../../../src/components/layout/content/content.component';
import { MEMBERS_URL } from '../../../src/constants/route.constants';
import LoadBackdrop from '../../../src/elements/backdrop.component';
import { MemberInterface } from '../../../src/interfaces/member.interface';
import { initializeApollo } from '../../../src/http/graphql.client';
import { getMemberQuery } from '../../../src/hooks/graphql/queries/get-member/get-member.query.hook';
import { GetMember, GetMemberVariables } from '../../../src/interfaces/generated/GetMember';
import { useUpdateMemberMutation } from '../../../src/hooks/graphql/mutations/update-member/update-member.mutation.hook';

interface PropTypes {
  member: MemberInterface | null;
  hasError: boolean;
  errorMessage: string;
}

const EditMember: FC<PropTypes> = (props: PropTypes): ReactElement => {

  const {
    member,
    hasError,
    errorMessage,
  } = props;

  const {
    firstName,
    handleFirstNameChange,
    hasFirstNameError,
    firstNameErrorMessage,
    lastName,
    handleLastNameChange,
    hasLastNameError,
    lastNameErrorMessage,
    email,
    handleEmailChange,
    hasEmailError,
    emailErrorMessage,
    licenseType,
    handleLicenceTypeChange,
    handleRolesChange,
    selectedRoles,
    status,
    handleIsActiveChange,
    formTouched,
    submitButtonEnabled,
    setMember,
  } = useMemberFormValidation();

  const {
    inProcessOfUpdatingMember,
    handleUpdateMember,
    updateMemberData,
    updateMemberErrorMessage,
  } = useUpdateMemberMutation();

  const router = useRouter();

  useEffect(() => {
    if (member) {
      setMember(member);
    }
  }, []);

  if (updateMemberData) {
    router.push(MEMBERS_URL);
    return (
      <LoadBackdrop
        isOpen={true}
      />
    );
  }

  if (hasError) {
    return (
      <Content>
        <Alert severity="error">{errorMessage}</Alert>
      </Content>
    );
  }

  return (
    <>
      <Content>
        <MemberForm
          title='Edit'
          firstName={firstName}
          hasFirstNameError={hasFirstNameError}
          firstNameErrorMessage={firstNameErrorMessage}
          onFirstNameChange={handleFirstNameChange}
          lastName={lastName}
          hasLastNameError={hasLastNameError}
          lastNameErrorMessage={lastNameErrorMessage}
          onLastNameChange={handleLastNameChange}
          email={email}
          hasEmailError={hasEmailError}
          emailErrorMessage={emailErrorMessage}
          onEmailChange={handleEmailChange}
          licenseType={licenseType}
          onLicenseTypeChange={handleLicenceTypeChange}
          selectedRoles={selectedRoles}
          onRolesChange={handleRolesChange}
          isActive={status === MemberStatus.ACTIVE}
          onIsActiveChange={handleIsActiveChange}
          formTouched={formTouched}
          submitButtonEnabled={submitButtonEnabled && !inProcessOfUpdatingMember}
          formErrorMessage={updateMemberErrorMessage}
          loading={inProcessOfUpdatingMember}
          submitFn={() => handleUpdateMember(
            member.id,
            status,
            firstName,
            lastName,
            email,
            selectedRoles,
            licenseType)}
        />
      </Content>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const memberId = parseInt(context.query.id as string);
  let member: MemberInterface = null;
  let hasError = false;
  let errorMessage = '';
  const { accessToken } = context.req.cookies;
  if (isNaN(memberId)) {
    hasError = true;
    return {
      props: {
        member,
        hasError,
        errorMessage: 'Invalid member id',
      },
    };
  }

  if (accessToken
    && memberId
  ) {
    const client = initializeApollo();
    try {
      const variables: GetMemberVariables = {
        id: memberId,
      };

      const result: ApolloQueryResult<GetMember> = await client.query({
        query: getMemberQuery,
        context: {
          headers: {
            authorization: `Bearer ${accessToken} `,
          },
        },
        fetchPolicy: 'network-only',
        variables,
      });
      member = result.data.getMember;
    } catch (e: unknown) {
      hasError = true;
      errorMessage = (e as Error).message;
    }
  }

  return {
    props: {
      member,
      hasError,
      errorMessage,
    },
  };
};

export default EditMember;
