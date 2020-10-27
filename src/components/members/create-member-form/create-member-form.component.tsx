import React, { FC, ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import { useMemberFormValidation } from '../../../hooks/forms/user-form-validation/user-form-validation.hook';
import { useCreateMemberMutation } from '../../../hooks/graphql/mutations/create-member/create-member.mutation.hook';
import CommonMemberForm from '../common-member-form/common-member-form.component';
import { MEMBERS_URL } from '../../../constants/route.constants';
import { MemberStatus } from '../../../interfaces/generated/globalTypes';

interface PropTypes {
  children?: never,
}

const CreateMemberForm: FC<PropTypes> = (props: PropTypes): ReactElement => {

  const {
    firstName,
    onFirstNameChange,
    hasFirstNameError,
    firstNameErrorMessage,
    lastName,
    onLastNameChange,
    hasLastNameError,
    lastNameErrorMessage,
    email,
    onEmailChange,
    hasEmailError,
    emailErrorMessage,
    licenseType,
    onLicenceTypeChange,
    roleCheckBoxesState,
    handleRoleChange,
    getSelectedRoles,
    status,
    handleIsActiveChange,
    formTouched,
    submitButtonEnabled,
  } = useMemberFormValidation();

  const {
    inProcessOfCreatingMember,
    createMemberAsync,
    memberData,
    createMemberErrorMessage,
  } = useCreateMemberMutation();


  if (memberData) {
    return (<Redirect to={MEMBERS_URL} />);
  }

  return (
    <>
      <CommonMemberForm
        title='Create'
        firstName={firstName}
        hasFirstNameError={hasFirstNameError}
        firstNameErrorMessage={firstNameErrorMessage}
        onFirstNameChange={onFirstNameChange}
        lastName={lastName}
        hasLastNameError={hasLastNameError}
        lastNameErrorMessage={lastNameErrorMessage}
        onLastNameChange={onLastNameChange}
        email={email}
        hasEmailError={hasEmailError}
        emailErrorMessage={emailErrorMessage}
        onEmailChange={onEmailChange}
        licenseType={licenseType}
        onLicenseTypeChange={onLicenceTypeChange}
        roleCheckBoxesState={roleCheckBoxesState}
        onRoleChange={handleRoleChange}
        isActive={status === MemberStatus.ACTIVE}
        onIsActiveChange={handleIsActiveChange}
        formTouched={formTouched}
        submitButtonEnabled={submitButtonEnabled}
        formErrorMessage={createMemberErrorMessage}
        loading={inProcessOfCreatingMember}
        submitFn={() => {
          return createMemberAsync(
            status,
            firstName,
            lastName,
            email,
            'password',
            getSelectedRoles(),
            licenseType);
        }}
      />
    </>
  );
};

export default CreateMemberForm;
