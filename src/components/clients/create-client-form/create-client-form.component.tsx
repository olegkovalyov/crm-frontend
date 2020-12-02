import React, { FC, ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import { CLIENTS_URL } from '../../../constants/route.constants';
import ClientForm from '../client-form/client-form.component';
import { useClientFormValidation } from '../../../hooks/ui/client-form-validation/client-form-validation.hook';
import { useCreateClientMutation } from '../../../hooks/graphql/mutations/create-client/create-client.mutation.hook';

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
    clientRole,
    onClientRoleChange,
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
    certificate,
    hasCertificateError,
    certificateErrorMessage,
    onCertificateChange,
    formTouched,
    submitButtonEnabled,
  } = useClientFormValidation();

  const {
    inProcessOfCreatingClient,
    createClientAsync,
    clientData,
    createClientErrorMessage,
  } = useCreateClientMutation();

  if (clientData) {
    return (<Redirect to={CLIENTS_URL} />);
  }

  return (
    <>
      <ClientForm
        title='Create'
        clientRole={clientRole}
        onClientRoleChange={onClientRoleChange}
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
        certificate={certificate}
        onCertificateChange={onCertificateChange}
        hasCertificateError={hasCertificateError}
        certificateErrorMessage={certificateErrorMessage}
        formTouched={formTouched}
        submitButtonEnabled={submitButtonEnabled}
        formErrorMessage={createClientErrorMessage}
        loading={inProcessOfCreatingClient}
        submitFn={() => {
          return createClientAsync(
            clientRole,
            clientStatus,
            gender,
            parseInt(age),
            firstName,
            lastName,
            email,
            parseInt(weight),
            phone,
            address,
            withHandCameraVideo,
            withCameraman,
            paymentStatus,
            null,
            null,
            notes,
            certificate,
          );
        }}
      />
    </>
  );
};

export default CreateClientForm;
