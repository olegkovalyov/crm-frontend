import React, { FC, ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useStyles } from './common-user-form.styles';
import FormSubmitButton from '../../elements/form-submit-button.component';
import FormSpinner from '../../elements/form-spinner.component';
import FormError from '../../elements/form-error.component';

import { licenseTypes, roles } from '../../constants/user';

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
  role: string,
  onRoleChange: (event: React.ChangeEvent<{ value: unknown }>) => void,
  formTouched: boolean,
  submitButtonDisabled: boolean,
  formErrorMessage: string,
  loading: boolean,
  submitFn: () => Promise<void>,
}

const CommonUserForm: FC<PropTypes> = (props: PropTypes): ReactElement => {
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
    role,
    onRoleChange,
    formTouched,
    submitButtonDisabled,
    formErrorMessage,
    loading,
    submitFn,
  } = props;

  const licenseTypeOptionsJsx = licenseTypes.map((value, index) => {
    return <MenuItem key={value} value={value}>{value}</MenuItem>;
  });

  const rolesOptionsJsx = roles.map((value, index) => {
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
          <Grid item xs={12} sm={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={role}
                onChange={onRoleChange}
                label="Role"
              >
                {rolesOptionsJsx}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <FormSubmitButton
          title="Save"
          show={true}
          disabled={submitButtonDisabled}
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

export default CommonUserForm;
