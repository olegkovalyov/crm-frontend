import React, { FC, ReactElement } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useMemberFormValidation } from '../../../src/hooks/members/member-form-validation/member-form-validation.hook';
import { useCreateMemberMutation } from '../../../src/hooks/graphql/mutations/create-member/create-member.mutation.hook';
import MemberForm from '../../../src/components/members/member-form/member-form.component';
import { MemberStatus } from '../../../src/interfaces/generated/globalTypes';
import { Content } from '../../../src/components/layout/content/content.component';
import { CLIENTS_URL, MEMBERS_URL } from '../../../src/constants/route.constants';
import LoadBackdrop from '../../../src/elements/backdrop.component';
import { useClientFormValidation } from '../../../src/hooks/clients/client-form-validation/client-form-validation.hook';
import { useCreateClientMutation } from '../../../src/hooks/graphql/mutations/create-client/create-client.mutation.hook';
import ClientForm from '../../../src/components/clients/client-form/client-form.component';


interface PropTypes {

}

const CreateClient: FC<PropTypes> = (props: PropTypes): ReactElement => {

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
  } = useClientFormValidation();

  const {
    inProcessOfCreatingClient,
    handleCreateClient,
    createClientData,
    createClientErrorMessage,
  } = useCreateClientMutation();

  const router = useRouter();

  if (createClientData) {
    router.push(CLIENTS_URL);
    return (
      <LoadBackdrop
        isOpen={true}
      />
    );
  }

  return (
    <>
      <Content>
        <ClientForm
          title='Create'
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
          formErrorMessage={createClientErrorMessage}
          loading={inProcessOfCreatingClient}
          submitFn={() => handleCreateClient(
              clientRole,
              status,
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
              notes,
              certificate,
            )}
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

export default CreateClient;
