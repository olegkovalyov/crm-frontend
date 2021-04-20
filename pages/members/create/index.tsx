import React, { FC, ReactElement } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useMemberFormValidation } from '../../../src/hooks/members/member-form-validation/member-form-validation.hook';
import { useCreateMemberMutation } from '../../../src/hooks/graphql/mutations/create-member/create-member.mutation.hook';
import MemberForm from '../../../src/components/members/member-form/member-form.component';
import { MemberStatus } from '../../../src/interfaces/generated/globalTypes';
import { Content } from '../../../src/components/layout/content/content.component';
import { MEMBERS_URL } from '../../../src/constants/route.constants';
import LoadBackdrop from '../../../src/elements/backdrop.component';


interface PropTypes {

}

const CreateMember: FC<PropTypes> = (props: PropTypes): ReactElement => {

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
    selectedRolesOptions,
    status,
    handleIsActiveChange,
    formTouched,
    submitButtonEnabled,
  } = useMemberFormValidation();

  const {
    inProcessOfCreatingMember,
    handleCreateMember,
    createMemberData,
    createMemberErrorMessage,
  } = useCreateMemberMutation();

  const router = useRouter();

  if (createMemberData) {
    router.push(MEMBERS_URL);
    return (
      <LoadBackdrop
        isOpen={true}
      />
    );
  }

  return (
    <>
      <Content>
        <MemberForm
          title='Create'
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
          selectedRoles={selectedRolesOptions}
          onRolesChange={handleRolesChange}
          isActive={status === MemberStatus.ACTIVE}
          onIsActiveChange={handleIsActiveChange}
          formTouched={formTouched}
          submitButtonEnabled={submitButtonEnabled && !inProcessOfCreatingMember}
          formErrorMessage={createMemberErrorMessage}
          loading={inProcessOfCreatingMember}
          submitFn={() => handleCreateMember(
            status,
            firstName,
            lastName,
            email,
            'password',
            selectedRolesOptions,
            licenseType)}
        />
      </Content>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
  // Pass data to the page via props
  return {
    props: {},
  };
};

export default CreateMember;
