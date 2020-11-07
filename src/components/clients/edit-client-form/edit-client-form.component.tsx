import React, { FC, ReactElement, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import { useSnackbar } from 'notistack';
import LoadBackdrop from '../../../elements/backdrop.component';
import { useBreadcrumbs } from '../../../hooks/core/breadcrumbs/breadcrumbs.hook';
import ClientForm from '../client-form/client-form.component';
import { useClientFormValidation } from '../../../hooks/ui/client-form-validation/client-form-validation.hook';
import { useGetClientQuery } from '../../../hooks/graphql/queries/get-client/get-client.query.hook';
import { useUpdateClientMutation } from '../../../hooks/graphql/mutations/update-client/update-client.mutation.hook';

interface PropTypes {
  id: string;
}

const EditClientForm: FC<PropTypes> = (props: PropTypes): ReactElement => {
  let errorMessage = '';

  const { setBreadcrumbsCustomData } = useBreadcrumbs();

  const { enqueueSnackbar } = useSnackbar();

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
    certificate,
    hasCertificateError,
    certificateErrorMessage,
    onCertificateChange,
    formTouched,
    submitButtonEnabled,
    setClient,
  } = useClientFormValidation();

  const {
    isClientLoading,
    getClientErrorMessage,
    setClientErrorMessage,
    client,
    wasClientLoadCalled,
    getClientAsync,
  } = useGetClientQuery();

  const {
    inProcessOfUpdatingClient,
    updateClientData,
    updateClientErrorMessage,
    updateClientAsync,
  } = useUpdateClientMutation();

  // Loading Client
  useEffect(() => {
    getClientAsync(props.id);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (client) {
      const fullName = `${client.firstName} ${client.lastName}`;
      setBreadcrumbsCustomData(props.id, fullName);
    }
  }, [client]); // eslint-disable-line

  useEffect(() => {
    if (!isClientLoading
      && wasClientLoadCalled) {
      if (client) {
        setClient(
          client.type,
          client.status,
          client.firstName,
          client.lastName,
          (client.email ?? ''),
          client.gender,
          client.age.toString(),
          client.weight.toString(),
          client.address,
          client.phone,
          (client.notes ?? ''),
          (client.certificate ?? ''),
          client.withHandCameraVideo,
          client.withCameraman,
          client.paymentStatus,
        );
      } else {
        setClientErrorMessage('Failed to load client');
      }
    }
  }, [isClientLoading, wasClientLoadCalled]); // eslint-disable-line

  useEffect(() => {
    if (updateClientData) {
      enqueueSnackbar('Saved', {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'bottom',
        },
      });
    }
  }, [updateClientData]); // eslint-disable-line


  if (isClientLoading) {
    return (
      <>
        <LoadBackdrop isOpen={true} />
      </>
    );
  }

  if (getClientErrorMessage) {
    return (
      <>
        <Alert severity="error">{getClientErrorMessage}</Alert>
      </>
    );
  }
  // End Loading Member

  // Updating Member
  if (updateClientErrorMessage) {
    errorMessage = updateClientErrorMessage;
  }
  // End Updating Member

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
        certificate={certificate}
        onCertificateChange={onCertificateChange}
        hasCertificateError={hasCertificateError}
        certificateErrorMessage={certificateErrorMessage}
        formTouched={formTouched}
        submitButtonEnabled={submitButtonEnabled}
        formErrorMessage={errorMessage}
        loading={inProcessOfUpdatingClient}
        submitFn={() => {
          return updateClientAsync(
            props.id,
            clientType,
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
            null,
            notes,
            certificate,
          );
        }}
      />
    </>
  );
};

export default EditClientForm;
