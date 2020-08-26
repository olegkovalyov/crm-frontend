import React, { FC, ReactElement, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useStyles } from './edit-user-form.styles';
import FormSubmitButton from '../../elements/form-submit-button.component';
import { useUserFormValidation } from '../../hooks/user-form-validation/user-form-validation.hook';
import FormSpinner from '../../elements/form-spinner.component';
import FormError from '../../elements/form-error.component';
import { useCreateUserRequest } from '../../hooks/user-create-user-request/user-create-user-request.hook';

interface PropTypes {
  id: string,
  children?: never,
}

const EditUserForm: FC<PropTypes> = (props: PropTypes): ReactElement => {
  const classes = useStyles();

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
  } = useUserFormValidation();

  const {
    loading,
    createUserAsync,
    data,
    errorMessage,
  } = useCreateUserRequest();

  console.log(data);


  // const user = useSelector((state: IRootState) => getUserById(state, props.id));
  useEffect(() => {
    // console.log(props.id);
  }, []);

  const [licenseType, setLicenseType] = React.useState('A');

  const [role, setRole] = React.useState('SKYDIVER');

  const handleLicenceTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLicenseType(event.target.value as string);
  };

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRole(event.target.value as string);
  };

  const title = (props.id === undefined) ? 'Add new user' : 'Edit user';

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
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
                <MenuItem value="D">D</MenuItem>
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
                <MenuItem value="STUDENT">Student</MenuItem>
                <MenuItem value="SKYDIVER">Skydiver</MenuItem>
                <MenuItem value="INSTRUCTOR">Instructor</MenuItem>
                <MenuItem value="PACKER">Packer</MenuItem>
                <MenuItem value="RIGGER">Rigger</MenuItem>
                <MenuItem value="MANIFEST">Manifest</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <FormSubmitButton
          title="Add user"
          show={!loading}
          disabled={saveButtonDisabled}
          className={classes.submit}
          onClick={(e) => {
            e.preventDefault();
            return createUserAsync(firstName, lastName, email, email, role, licenseType);
          }}
        />
        <FormSpinner show={loading} />
        <FormError className={classes.editUserErrorMessage} message={errorMessage} />
      </form>
    </>
  );
};

export default EditUserForm;
