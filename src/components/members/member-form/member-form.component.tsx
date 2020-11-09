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
import MemberRoles from '../../common/member-roles/member-roles.component';
import { RoleCheckBoxesStateType } from '../../../interfaces/member.interface';


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
  roleCheckBoxesState: RoleCheckBoxesStateType,
  onRoleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
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
    onFirstNameChange,
    lastName,
    hasLastNameError,
    lastNameErrorMessage,
    onLastNameChange,
    email,
    hasEmailError,
    emailErrorMessage,
    onEmailChange,
    licenseType,
    onLicenseTypeChange,
    roleCheckBoxesState,
    onRoleChange,
    isActive,
    onIsActiveChange,
    formTouched,
    submitButtonEnabled,
    formErrorMessage,
    loading,
    submitFn,
  } = props;


  const licenseTypeOptionsJsx = licenseTypes.map((value, index) => {
    return <MenuItem key={value} value={value}>{value}</MenuItem>;
  });


  return (
    <>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={firstName}
              onChange={(e) => onFirstNameChange(e.target.value)}
              error={hasFirstNameError && formTouched}
              helperText={firstNameErrorMessage}
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={lastName}
              onChange={(e) => onLastNameChange(e.target.value)}
              error={hasLastNameError && formTouched}
              helperText={lastNameErrorMessage}
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              error={hasEmailError && formTouched}
              helperText={emailErrorMessage}
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">License type</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={licenseType}
                onChange={onLicenseTypeChange}
                label="License type"
              >
                {licenseTypeOptionsJsx}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormLabel component="legend">Roles</FormLabel>
            <MemberRoles
              roleCheckBoxesState={roleCheckBoxesState}
              onRoleChange={onRoleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={<Switch checked={isActive} onChange={onIsActiveChange} name="isActive" color="primary" />}
              label="Active"

            />
          </Grid>
        </Grid>
        <FormSubmitButton
          title="Save"
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
