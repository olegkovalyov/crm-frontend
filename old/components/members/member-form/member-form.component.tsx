import React, { FC, ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { FormControlLabel, FormLabel, Switch } from '@material-ui/core';
import { useStyles } from './member-form.styles';
import FormSubmitButton from '../../../elements/form-submit-button.component';
import FormSpinner from '../../../elements/form-spinner.component';
import FormError from '../../../elements/form-error.component';

import {
  licenseTypes,
} from '../../../constants/member.constants';
import { MemberRole } from '../../../interfaces/generated/globalTypes';
import MemberRolesOptions from '../member-roles-options/member-roles-options.component';
import FirstName from '../../common/first-name/first-name.component';
import LastName from '../../common/last-name/last-name.component';
import Email from '../../common/email/email.component';


interface PropTypes {
  children?: never,
  title: string,
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
  licenseType: string,
  onLicenseTypeChange: (event: React.ChangeEvent<{ value: unknown }>) => void,
  selectedRoles: MemberRole[],
  onRolesChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  isActive: boolean,
  onIsActiveChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  formTouched: boolean,
  submitButtonEnabled: boolean,
  formErrorMessage: string,
  loading: boolean,
  submitFn: () => Promise<void>,
}

const MemberForm: FC<PropTypes> = (props: PropTypes): ReactElement => {
  const classes = useStyles();
  const {
    title,
    firstName,
    hasFirstNameError,
    firstNameErrorMessage,
    onFirstNameChange: handleFirstNameChange,
    lastName,
    hasLastNameError,
    lastNameErrorMessage,
    onLastNameChange: handleLastNameChange,
    email,
    hasEmailError,
    emailErrorMessage,
    onEmailChange: handleEmailChange,
    licenseType,
    onLicenseTypeChange: handleLicenseTypeChange,
    selectedRoles,
    onRolesChange: handleRolesChange,
    isActive,
    onIsActiveChange: handleIsActiveChange,
    formTouched,
    submitButtonEnabled,
    formErrorMessage,
    loading,
    submitFn,
  } = props;

  const licenseTypeOptionsJsx = licenseTypes.map((value, index) =>
    <MenuItem
      key={value}
      value={value}>{value}
    </MenuItem>,
  );

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FirstName
              firstName={firstName}
              onFirstNameChange={handleFirstNameChange}
              hasFirstNameError={hasFirstNameError}
              firstNameErrorMessage={firstNameErrorMessage}
              formTouched={formTouched}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LastName
              lastName={lastName}
              onLastNameChange={handleLastNameChange}
              hasLastNameError={hasLastNameError}
              lastNameErrorMessage={lastNameErrorMessage}
              formTouched={formTouched}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Email
              email={email}
              onEmailChange={handleEmailChange}
              hasEmailError={hasEmailError}
              emailErrorMessage={emailErrorMessage}
              formTouched={formTouched}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">License type</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={licenseType}
                onChange={handleLicenseTypeChange}
                label="License type"
              >
                {licenseTypeOptionsJsx}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormLabel component="legend">Roles</FormLabel>
            <MemberRolesOptions
              roles={selectedRoles}
              onRolesChange={handleRolesChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={isActive}
                  onChange={handleIsActiveChange}
                  name="isActive"
                  color="primary"
                />
              }
              label="Active"
            />
          </Grid>
        </Grid>
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
      </form>
    </>
  );
};

export default MemberForm;
