import React, { FC, ReactElement, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Checkbox, FormControlLabel, FormLabel } from '@material-ui/core';
import { useStyles } from './common-user-form.styles';
import FormSubmitButton from '../../../elements/form-submit-button.component';
import FormSpinner from '../../../elements/form-spinner.component';
import FormError from '../../../elements/form-error.component';

import {
  licenseTypes,
  RolesType,
  USER_STATUS_ACTIVE,
  userRoles,
  UserStatusType,
} from '../../../constants/user.constants';

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
  roles: RolesType[],
  formTouched: boolean,
  submitButtonDisabled: boolean,
  formErrorMessage: string,
  loading: boolean,
  submitFn: (selectedRoles: RolesType[], selectedStatus: UserStatusType) => Promise<void>,
}

export type RoleCheckBoxesStateType = {
  [key in RolesType]?: boolean
};

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
    roles,
    formTouched,
    submitButtonDisabled,
    formErrorMessage,
    loading,
    submitFn,
  } = props;


  const initialRoleCheckboxesState: RoleCheckBoxesStateType = {};
  userRoles.forEach((value) => {
    initialRoleCheckboxesState[value] = roles.includes(value);
  });
  const [roleCheckBoxesState, setRoleCheckboxesState] = useState<RoleCheckBoxesStateType>(initialRoleCheckboxesState);

  const onRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleCheckboxesState(prevState => {
      const newFormRolesState = { ...prevState };
      newFormRolesState[e.target.value as RolesType] = e.target.checked;
      return newFormRolesState;
    });
  };


  const licenseTypeOptionsJsx = licenseTypes.map((value, index) => {
    return <MenuItem key={value} value={value}>{value}</MenuItem>;
  });

  const rolesJsx = userRoles.map((value) => {
    return <FormControlLabel
      key={value}
      value={value}
      control={<Checkbox color="primary" checked={roleCheckBoxesState[value]} onChange={onRoleChange} />}
      label={value[0].toUpperCase() + value.slice(1).toLowerCase()}
      labelPlacement="start"
    />;
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
            {rolesJsx}
          </Grid>
        </Grid>
        <FormSubmitButton
          title="Save"
          show={true}
          disabled={submitButtonDisabled}
          className={classes.submit}
          onClick={(e) => {
            e.preventDefault();
            const updatedRoles: RolesType[] = [];
            userRoles.forEach(value => {
              if (roleCheckBoxesState[value] === true) {
                updatedRoles.push(value);
              }
            });
            return submitFn(updatedRoles, USER_STATUS_ACTIVE);
          }}
        />
        <FormSpinner show={loading} />
        <FormError className={classes.editUserErrorMessage} message={formErrorMessage} />
      </form>
    </>
  );
};

export default CommonUserForm;
