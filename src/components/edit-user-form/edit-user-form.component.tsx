import React, { FC, ReactElement, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Redirect } from 'react-router-dom';
import { useStyles } from './edit-user-form.styles';
import FormSubmitButton from '../../elements/form-submit-button.component';
import { useUserFormValidation } from '../../hooks/user-form-validation/user-form-validation.hook';
import FormSpinner from '../../elements/form-spinner.component';
import FormError from '../../elements/form-error.component';
import { useGetUserRequest } from '../../hooks/get-user-request/get-user-request.hook';
import LoadBackdrop from '../../elements/backdrop.component';
import { url } from '../../constants/url';
import { licenseTypes, roles } from '../../constants/user';
import { useUpdateUserRequest } from '../../hooks/update-user-request/update-user-request.hook';

interface PropTypes {
  id: string,
  children?: never,
}

const EditUserForm: FC<PropTypes> = (props: PropTypes): ReactElement => {
  const classes = useStyles();

  let errorMessage = '';

  const [needPopulateColumns, setNeedPopulateColumns] = useState(true);
  const [licenseType, setLicenseType] = useState('NONE');
  const [role, setRole] = useState('SKYDIVER');

  const {
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
    formTouched,
    saveButtonDisabled,
    setUser,
  } = useUserFormValidation();

  const {
    isUserLoading,
    userError,
    userData,
    getUser,
  } = useGetUserRequest(props.id);

  const {
    loading,
    updateErrorMessage,
    updatedUserData,
    updateUserAsync,
  } = useUpdateUserRequest();

  // Loading User
  useEffect(() => {
    getUser();
  }, [getUser]);

  if (userData
    && needPopulateColumns
  ) {
    const currentUser = userData.getUser;
    if (currentUser !== null) {
      setUser(currentUser.firstName, currentUser.lastName, currentUser.email);
      setRole(currentUser.role);
      if (currentUser.licenseType === null) {
        setLicenseType('NONE');
      } else {
        setLicenseType(currentUser.licenseType);
      }
      setNeedPopulateColumns(false);
    } else {
      return (<Redirect to={url.users} />);
    }
  }

  if (isUserLoading) {
    return (
      <>
        <LoadBackdrop isOpen={true} />
      </>
    );
  }

  if (userError) {
    errorMessage = userError.message;
  }
  // End Loading User

  // Updating User
  if (updateErrorMessage) {
    errorMessage = updateErrorMessage;
  }

  if (updatedUserData) {
    return (<Redirect to={url.users} />);
  }
  // End Updating User


  const handleLicenceTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLicenseType(event.target.value as string);
  };

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRole(event.target.value as string);
  };

  const title = 'Edit User';

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
                onChange={handleLicenceTypeChange}
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
                onChange={handleRoleChange}
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
          disabled={saveButtonDisabled}
          className={classes.submit}
          onClick={(e) => {
            e.preventDefault();
            return updateUserAsync(props.id, firstName, lastName, email, null, role, licenseType);
          }}
        />
        <FormSpinner show={loading} />
        <FormError className={classes.editUserErrorMessage} message={errorMessage} />
      </form>
    </>
  );
};

export default EditUserForm;
