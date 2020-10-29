import React, { FC, ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import { useCreateMemberMutation } from '../../../hooks/graphql/mutations/create-member/create-member.mutation.hook';
import { MEMBERS_URL } from '../../../constants/route.constants';
import { LicenseType, MemberStatus } from '../../../interfaces/generated/globalTypes';
import ClientForm from '../client-form/client-form.component';
import { useClientFormValidation } from '../../../hooks/forms/client-form-validation/client-form-validation.hook';

interface PropTypes {
  children?: never,
}

const CreateClientForm: FC<PropTypes> = (props: PropTypes): ReactElement => {

  const {
    age,
    ageErrorMessage,
    hasAgeError,
    onAgeChange,
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
    clientType,
    onClientTypeChange,
    clientStatus,
    onClientStatusChange,
    paymentStatus,
    onPaymentStatusChange,
    gender,
    onGenderChange,
    weight,
    weightErrorMessage,
    hasWeightError,
    onWeightChange,
    phone,
    phoneErrorMessage,
    hasPhoneError,
    onPhoneChange,
    address,
    addressErrorMessage,
    onAddressChange,
    hasAddressError,
    withCameraman,
    onWithCameramanChange,
    withHandCameraVideo,
    onWithHandCameraVideoChange,
    notes,
    onNotesChange,
    formTouched,
    submitButtonEnabled,
  } = useClientFormValidation();

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
      <ClientForm
        title='Create'
        clientType={clientType}
        onClientTypeChange={onClientTypeChange}
        clientStatus={clientStatus}
        onClientStatusChange={onClientStatusChange}
        age={age}
        hasAgeError={hasAgeError}
        ageErrorMessage={ageErrorMessage}
        onAgeChange={onAgeChange}
        weight={weight}
        weightErrorMessage={weightErrorMessage}
        onWeightChange={onWeightChange}
        hasWeightError={hasWeightError}
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
        phone={phone}
        phoneErrorMessage={phoneErrorMessage}
        onPhoneChange={onPhoneChange}
        hasPhoneError={hasPhoneError}
        address={address}
        addressErrorMessage={addressErrorMessage}
        onAddressChange={onAddressChange}
        hasAddressError={hasAddressError}
        paymentStatus={paymentStatus}
        onPaymentStatusChange={onPaymentStatusChange}
        gender={gender}
        onGenderChange={onGenderChange}
        withHandCameraVideo={withHandCameraVideo}
        onWithHandCameraVideoChange={onWithHandCameraVideoChange}
        withCameraman={withCameraman}
        onWithCameramanChange={onWithCameramanChange}
        notes={notes}
        onNotesChange={onNotesChange}
        formTouched={formTouched}
        submitButtonEnabled={submitButtonEnabled}
        formErrorMessage={createMemberErrorMessage}
        loading={inProcessOfCreatingMember}
        submitFn={() => {
          return createMemberAsync(
            MemberStatus.ACTIVE,
            firstName,
            lastName,
            email,
            'password',
            [],
            LicenseType.NONE);
        }}
      />
    </>
  );
};

export default CreateClientForm;
