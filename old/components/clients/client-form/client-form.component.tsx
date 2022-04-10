import React, { FC, ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './client-form.styles';
import FormSubmitButton from '../../../elements/form-submit-button.component';
import FormSpinner from '../../../elements/form-spinner.component';
import FormError from '../../../elements/form-error.component';
import { ClientStatus, ClientRole, Gender } from '../../../interfaces/generated/globalTypes';
import ClientStatusOptions from '../../common/client-status-options/client-status-options.component';
import ClientEventOptions from '../../common/client-event-options/client-event-options.component';
import ClientVideoOptions from '../../common/client-video-options/client-video-options.component';
import Notes from '../../common/notes/notes.component';
import Address from '../../common/address/address.component';
import ClientGenderOptions from '../../common/client-gender-options/client-gender-options.component';
import Age from '../../common/age/age.component';
import Weight from '../../common/weight/weight.component';
import Phone from '../../common/phone/phone.component';
import Email from '../../common/email/email.component';
import FirstName from '../../common/first-name/first-name.component';
import LastName from '../../common/last-name/last-name.component';
import Certificate from '../../common/certificate/certificate.component';

interface PropTypes {
  children?: never,
  title: string,
  clientRole: ClientRole,
  onClientRoleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  clientStatus: ClientStatus,
  onClientStatusChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  age: string,
  hasAgeError: boolean,
  ageErrorMessage: string,
  onAgeChange: (value: string) => void,
  firstName: string,
  hasFirstNameError: boolean,
  firstNameErrorMessage: string,
  onFirstNameChange: (value: string) => void,
  lastName: string,
  hasLastNameError: boolean,
  lastNameErrorMessage: string,
  onLastNameChange: (value: string) => void,
  email: string,
  hasEmailError: boolean,
  emailErrorMessage: string,
  onEmailChange: (value: string) => void,
  gender: Gender,
  onGenderChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  weight: string,
  hasWeightError: boolean,
  weightErrorMessage: string,
  onWeightChange: (value: string) => void,
  phone: string,
  hasPhoneError: boolean,
  phoneErrorMessage: string,
  onPhoneChange: (value: string) => void,
  address: string,
  hasAddressError: boolean,
  addressErrorMessage: string,
  onAddressChange: (value: string) => void,
  withHandCameraVideo: boolean,
  onWithHandCameraVideoChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  withCameraman: boolean,
  onWithCameramanChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  notes: string,
  certificate: string,
  hasCertificateError: boolean,
  certificateErrorMessage: string,
  onCertificateChange: (value: string) => void,
  onNotesChange: (value: string) => void,
  formTouched: boolean,
  submitButtonEnabled: boolean,
  formErrorMessage: string,
  loading: boolean,
  submitFn: () => Promise<void>,
}

const ClientForm: FC<PropTypes> = (props: PropTypes): ReactElement => {
  const classes = useStyles();
  const {
    title,
    age,
    hasAgeError,
    ageErrorMessage,
    onAgeChange,
    firstName,
    hasFirstNameError,
    firstNameErrorMessage,
    onFirstNameChange,
    lastName,
    hasLastNameError,
    lastNameErrorMessage,
    onLastNameChange,
    email,
    hasEmailError,
    emailErrorMessage,
    onEmailChange,
    clientRole,
    onClientRoleChange,
    clientStatus,
    onClientStatusChange,
    gender,
    onGenderChange,
    weight,
    onWeightChange,
    hasWeightError,
    weightErrorMessage,
    phone,
    phoneErrorMessage,
    hasPhoneError,
    onPhoneChange,
    address,
    addressErrorMessage,
    onAddressChange,
    hasAddressError,
    withHandCameraVideo,
    onWithHandCameraVideoChange,
    withCameraman,
    onWithCameramanChange,
    notes,
    onNotesChange,
    certificate,
    hasCertificateError,
    certificateErrorMessage,
    onCertificateChange,
    formTouched,
    submitButtonEnabled,
    formErrorMessage,
    loading,
    submitFn,
  } = props;


  return (
    <>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Grid item xs={12}>
              <FirstName
                firstName={firstName}
                onFirstNameChange={onFirstNameChange}
                hasFirstNameError={hasFirstNameError}
                firstNameErrorMessage={firstNameErrorMessage}
                formTouched={formTouched}
              />
            </Grid>
            <Grid item xs={12}>
              <LastName
                className={classes.inputMargin}
                lastName={lastName}
                onLastNameChange={onLastNameChange}
                hasLastNameError={hasLastNameError}
                lastNameErrorMessage={lastNameErrorMessage}
                formTouched={formTouched}
              />
            </Grid>
            <Grid item xs={12}>
              <Email
                className={classes.inputMargin}
                email={email}
                onEmailChange={onEmailChange}
                hasEmailError={hasEmailError}
                emailErrorMessage={emailErrorMessage}
                formTouched={formTouched}
              />
            </Grid>
            <Grid item xs={12}>
              <Phone
                className={classes.inputMargin}
                phone={phone}
                onPhoneChange={onPhoneChange}
                hasPhoneError={hasPhoneError}
                phoneErrorMessage={phoneErrorMessage}
                formTouched={formTouched}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Age
              age={age}
              onAgeChange={onAgeChange}
              hasAgeError={hasAgeError}
              ageErrorMessage={ageErrorMessage}
              formTouched={formTouched}
            />
            <Weight
              className={classes.inputMargin}
              weight={weight}
              onWeightChange={onWeightChange}
              hasWeightError={hasWeightError}
              weightErrorMessage={weightErrorMessage}
              formTouched={formTouched}
            />
            <Certificate
              className={classes.inputMargin}
              certificate={certificate}
              onCertificateChange={onCertificateChange}
              certificateErrorMessage={certificateErrorMessage}
              hasCertificateError={hasCertificateError}
              formTouched={formTouched}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ClientStatusOptions
                  clientStatus={clientStatus}
                  onClientStatusChange={onClientStatusChange}
                />
              </Grid>
              <Grid item xs={12}>
                <ClientGenderOptions
                  gender={gender}
                  onGenderChange={onGenderChange}
                />
              </Grid>
              <Grid item xs={12}>
                <ClientEventOptions
                  clientRole={clientRole}
                  onClientRoleChange={onClientRoleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <ClientVideoOptions
                  clientRole={clientRole}
                  withCameraman={withCameraman}
                  onWithCameramanChange={onWithCameramanChange}
                  withHandCameraVideo={withHandCameraVideo}
                  onWithHandCameraVideoChange={onWithHandCameraVideoChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Address
              address={address}
              onAddressChange={onAddressChange}
              hasAddressError={hasAddressError}
              addressErrorMessage={addressErrorMessage}
              formTouched={formTouched}
            />
          </Grid>
          <Grid item xs={12}>
            <Notes
              notes={notes}
              onNotesChange={onNotesChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormSubmitButton
              title={title === 'Edit' ? 'Save' : 'Create'}
              show={true}
              disabled={!submitButtonEnabled}
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                return submitFn();
              }}
            />
            <FormSpinner show={loading} />
            <FormError className={classes.editUserErrorMessage} message={formErrorMessage} />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ClientForm;
