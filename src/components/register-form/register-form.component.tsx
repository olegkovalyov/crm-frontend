import React, { FC, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { useStyles } from './register-form.styles';
import FormSubmitButton from '../../elements/form-submit-button.component';
import { Copyright } from '../../elements/copyright.component';
import { url } from '../../constants/url';
import FormSpinner from '../../elements/form-spinner.component';
import FormError from '../../elements/form-error.component';
import { useRegisterFormValidation } from '../../hooks/register-form-validation/register-form-validation.hook';
import { useRegisterFormRequest } from '../../hooks/register-form-request/register-form-request.hook';


const RegisterForm: FC = (props): ReactElement => {
  const history = useHistory();
  const classes = useStyles();


  const {
    onEmailChange,
    onFirstNameChange,
    onLastNameChange,
    onPasswordChange,
    onConfirmPasswordChange,
    email,
    hasEmailError,
    emailErrorMessage,
    password,
    hasPasswordError,
    confirmPassword,
    hasConfirmPasswordError,
    confirmPasswordErrorMessage,
    passwordErrorMessage,
    firstName,
    hasFirstNameError,
    firstNameErrorMessage,
    lastName,
    hasLastNameError,
    lastNameErrorMessage,
    formTouched,
    registerButtonDisabled,
  } = useRegisterFormValidation();

  const role = 'SKYDIVER';
  const licenseType = 'NONE';

  const {
    loading,
    registerAsync,
    errorMessage,
  } = useRegisterFormRequest();


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={firstName}
                onChange={(e) => onFirstNameChange(e.target.value)}
                error={hasFirstNameError && formTouched}
                helperText={firstNameErrorMessage}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={lastName}
                onChange={(e) => onLastNameChange(e.target.value)}
                error={hasLastNameError && formTouched}
                helperText={lastNameErrorMessage}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                error={hasEmailError && formTouched}
                helperText={emailErrorMessage}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                error={hasPasswordError && formTouched}
                helperText={passwordErrorMessage}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={confirmPassword}
                onChange={(e) => onConfirmPasswordChange(e.target.value)}
                error={hasConfirmPasswordError && formTouched}
                helperText={confirmPasswordErrorMessage}
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="confirmPassword"
                id="confirmPassword"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <FormSubmitButton
            title="Log In"
            show={true}
            disabled={registerButtonDisabled}
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault();
              return registerAsync(email, password, firstName, lastName, role, licenseType);
            }}
          />
          <FormSpinner show={loading} />
          <FormError className={classes.registerErrorMessage} message={errorMessage} />
          <Grid container justify="flex-end">
            <Grid item>
              <Link className={classes.link} onClick={() => history.push(url.login)}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default RegisterForm;
