import React, { FC, ReactElement, useEffect } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { ApolloQueryResult } from '@apollo/client';
import Alert from '@material-ui/lab/Alert';
import { Content } from '../../../src/components/layout/content/content.component';
import { CLIENTS_URL } from '../../../src/constants/route.constants';
import LoadBackdrop from '../../../src/elements/backdrop.component';
import { initializeApollo } from '../../../src/http/graphql.client';
import { ClientInterface } from '../../../src/interfaces/client.interface';
import { GetClient, GetClientVariables } from '../../../src/interfaces/generated/GetClient';
import { getClientQuery } from '../../../src/hooks/graphql/queries/get-client/get-client.query.hook';
import { useClientFormValidation } from '../../../src/hooks/clients/client-form-validation/client-form-validation.hook';
import { useUpdateClientMutation } from '../../../src/hooks/graphql/mutations/update-client/update-client.mutation.hook';
import ClientForm from '../../../src/components/clients/client-form/client-form.component';
import { Gender, PaymentStatus } from '../../../src/interfaces/generated/globalTypes';

interface PropTypes {
  client: ClientInterface | null;
  hasError: boolean;
  errorMessage: string;
}

const EditClient: FC<PropTypes> = (props: PropTypes): ReactElement => {

  const {
    client,
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
    clientRole,
    handleClientRoleChange,
    status,
    handleClientStatusChange,
    gender,
    handleGenderChange,
    age,
    ageErrorMessage,
    hasAgeError,
    handleAgeChange,
    weight,
    weightErrorMessage,
    hasWeightError,
    handleWeightChange,
    phone,
    phoneErrorMessage,
    hasPhoneError,
    handlePhoneChange,
    address,
    addressErrorMessage,
    handleAddressChange,
    hasAddressError,
    withCameraman,
    handleWithCameramanChange,
    withHandCameraVideo,
    handleWithHandCameraVideoChange,
    notes,
    certificate,
    certificateErrorMessage,
    handleCertificateChange,
    hasCertificateError,
    handleNotesChange,
    formTouched,
    submitButtonEnabled,
    setClient,
  } = useClientFormValidation();

  const {
    inProcessOfUpdatingClient,
    handleClientUpdate,
    updatedClient,
    updateClientErrorMessage,
  } = useUpdateClientMutation();

  const router = useRouter();

  useEffect(() => {
    if (client) {
      setClient(client);
    }
  }, []);

  if (updatedClient) {
    router.push(CLIENTS_URL);
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
        <ClientForm
          title='Edit'
          clientRole={clientRole}
          onClientRoleChange={handleClientRoleChange}
          clientStatus={status}
          onClientStatusChange={handleClientStatusChange}
          age={age}
          hasAgeError={hasAgeError}
          ageErrorMessage={ageErrorMessage}
          onAgeChange={handleAgeChange}
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
          gender={gender}
          onGenderChange={handleGenderChange}
          weight={weight}
          hasWeightError={hasWeightError}
          weightErrorMessage={weightErrorMessage}
          onWeightChange={handleWeightChange}
          phone={phone}
          hasPhoneError={hasPhoneError}
          phoneErrorMessage={phoneErrorMessage}
          onPhoneChange={handlePhoneChange}
          address={address}
          hasAddressError={hasAddressError}
          addressErrorMessage={addressErrorMessage}
          onAddressChange={handleAddressChange}
          withHandCameraVideo={withHandCameraVideo}
          onWithHandCameraVideoChange={handleWithHandCameraVideoChange}
          withCameraman={withCameraman}
          onWithCameramanChange={handleWithCameramanChange}
          notes={notes}
          onNotesChange={handleNotesChange}
          certificate={certificate}
          hasCertificateError={hasCertificateError}
          certificateErrorMessage={certificateErrorMessage}
          onCertificateChange={handleCertificateChange}
          formTouched={formTouched}
          submitButtonEnabled={submitButtonEnabled}
          formErrorMessage={updateClientErrorMessage}
          loading={inProcessOfUpdatingClient}
          submitFn={() => handleClientUpdate(
            client.id,
            clientRole,
            status,
            PaymentStatus.NOT_PAID,
            Gender.MALE,
            new Date(),
            firstName,
            lastName,
            email,
            parseInt(weight),
            phone,
            '',
            '',
            new Date(),
          )}
        />
      </Content>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const clientId = parseInt(context.query.id as string);
  let client: ClientInterface = null;
  let hasError = false;
  let errorMessage = '';
  const { accessToken } = context.req.cookies;
  if (isNaN(clientId)) {
    hasError = true;
    return {
      props: {
        client,
        hasError,
        errorMessage: 'Invalid client id',
      },
    };
  }

  if (accessToken
    && clientId
  ) {
    const apolloClient = initializeApollo();
    try {
      const variables: GetClientVariables = {
        id: clientId,
      };

      const result: ApolloQueryResult<GetClient> = await apolloClient.query({
        query: getClientQuery,
        context: {
          headers: {
            authorization: `Bearer ${accessToken} `,
          },
        },
        fetchPolicy: 'network-only',
        variables,
      });
      client = result.data.getClient;
    } catch (e: unknown) {
      hasError = true;
      errorMessage = (e as Error).message;
    }
  }

  return {
    props: {
      client,
      hasError,
      errorMessage,
    },
  };
};

export default EditClient;
