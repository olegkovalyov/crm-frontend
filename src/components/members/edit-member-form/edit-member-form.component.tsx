import React, { FC, ReactElement, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import { useSnackbar } from 'notistack';
import { useMemberFormValidation } from '../../../hooks/ui/member-form-validation/member-form-validation.hook';
import { useGetMemberQuery } from '../../../hooks/graphql/queries/get-member/get-member.query.hook';
import LoadBackdrop from '../../../elements/backdrop.component';
import { useUpdateMemberMutation } from '../../../hooks/graphql/mutations/update-member/update-member.mutation.hook';
import CommonMemberForm from '../common-member-form/common-member-form.component';
import { MemberStatus } from '../../../interfaces/generated/globalTypes';
import { useBreadcrumbs } from '../../../hooks/core/breadcrumbs/breadcrumbs.hook';

interface PropTypes {
  id: string;
}

const EditMemberForm: FC<PropTypes> = (props: PropTypes): ReactElement => {
  let errorMessage = '';

  const { setBreadcrumbsCustomData } = useBreadcrumbs();

  const { enqueueSnackbar } = useSnackbar();

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
    setMember,
  } = useMemberFormValidation();

  const {
    isMemberLoading,
    getMemberErrorMessage,
    setMemberErrorMessage,
    member,
    wasMemberLoadCalled,
    getMemberAsync,
  } = useGetMemberQuery();

  const {
    inProcessOfUpdatingMember,
    updateMemberData,
    updateMemberErrorMessage,
    updateMemberAsync,
  } = useUpdateMemberMutation();

  // Loading Member
  useEffect(() => {
    getMemberAsync(props.id);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (member) {
      const fullName = `${member.firstName} ${member.lastName}`;
      setBreadcrumbsCustomData(props.id, fullName);
    }
  }, [member]); // eslint-disable-line

  useEffect(() => {
    if (!isMemberLoading
      && wasMemberLoadCalled) {
      if (member) {
        setMember(
          member.status,
          member.firstName,
          member.lastName,
          member.email,
          member.roles,
          member.licenseType!,
        );
      } else {
        setMemberErrorMessage('Failed to load member');
      }
    }
  }, [isMemberLoading, wasMemberLoadCalled]); // eslint-disable-line

  useEffect(() => {
    if (updateMemberData) {
      enqueueSnackbar('Saved', {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'bottom',
        },
      });
    }
  }, [updateMemberData]); // eslint-disable-line


  if (isMemberLoading) {
    return (
      <>
        <LoadBackdrop isOpen={true} />
      </>
    );
  }

  if (getMemberErrorMessage) {
    return (
      <>
        <Alert severity="error">{getMemberErrorMessage}</Alert>
      </>
    );
  }
  // End Loading Member

  // Updating Member
  if (updateMemberErrorMessage) {
    errorMessage = updateMemberErrorMessage;
  }
  // End Updating Member

  return (
    <>
      <CommonMemberForm
        title="Edit"
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
        formErrorMessage={errorMessage}
        loading={inProcessOfUpdatingMember}
        submitFn={() => {
          return updateMemberAsync(
            props.id,
            status,
            firstName,
            lastName,
            email,
            null,
            getSelectedRoles(),
            licenseType);
        }}
      />
    </>
  );
};

export default EditMemberForm;
