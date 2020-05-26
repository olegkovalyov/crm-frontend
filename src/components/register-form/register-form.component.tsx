import React, { FC, ReactElement, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router-dom';
import validate from 'validate.js';
import { useStyles } from './register-form.styles';
import FormSubmitButton from '../../elements/form-submit-button.component';
import { Copyright } from '../../elements/copyright.component';
import { url } from '../../constants/url';
import {
  emailConstraints,
  firstNameConstrains,
  lastNameConstrains,
  passwordConstrains,
  validateInput,
} from '../../common/inputValidator';
import { passwordsEqualConstraints, validatePasswordsEquality } from '../../common/passwordsEqualValidator';
import { IRootState } from '../../redux/root.reducer';
import { getLoginFormError, getRegisterFormError, needShowSpinner } from '../../redux/ui/ui.selector';
import FormSpinner from '../../elements/form-spinner.component';
import FormError from '../../elements/form-error.component';


const RegisterForm: FC = (props): ReactElement => {
  const history = useHistory();

  const classes = useStyles();

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [hasFirstNameError, setHasFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');

  const [lastName, setLastName] = useState('');
  const [hasLastNameError, setHasLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasConfirmPasswordError, setHasConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

  const [registerButtonDisabled, setRegisterButtonDisabled] = useState(true);

  const isAsyncProcessRunning = useSelector((state: IRootState) => needShowSpinner(state));
  const errorMessage = useSelector((state: IRootState) => getRegisterFormError(state));


  useEffect(() => {
    if (!hasEmailError
      && !hasPasswordError
      && !hasConfirmPasswordError
      && !hasFirstNameError
      && !hasLastNameError
      && email.length
      && password.length
      && firstName.length
      && lastName.length
      && confirmPassword.length
    ) {
      setRegisterButtonDisabled(false);
    } else {
      setRegisterButtonDisabled(true);
    }
  }, [
    hasEmailError,
    hasPasswordError,
    hasConfirmPasswordError,
    hasFirstNameError,
    hasLastNameError,
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
  ]);

  const registerAsync = (e: React.MouseEvent) => {
    e.preventDefault();
    /*
    dispatch(registerStartAction({
      firstName,
      lastName,
      email,
      password,
    }));
     */
  };


  const onFirstNameChange = (value: string): void => {
    validateInput(value, setFirstName, setFirstNameErrorMessage, setHasFirstNameError, firstNameConstrains);
  };

  const onLastNameChange = (value: string): void => {
    validateInput(value, setLastName, setLastNameErrorMessage, setHasLastNameError, lastNameConstrains);
  };


  const onEmailChange = (value: string): void => {
    validateInput(value, setEmail, setEmailErrorMessage, setHasEmailError, emailConstraints);
  };

  const onPasswordChange = (value: string): void => {
    validateInput(value, setPassword, setPasswordErrorMessage, setHasPasswordError, passwordConstrains);
  };

  const onConfirmPasswordChange = (value: string): void => {
    validatePasswordsEquality({
      password,
      confirmPassword: value,
    }, setConfirmPassword, setConfirmPasswordErrorMessage, setHasConfirmPasswordError, passwordsEqualConstraints);
  };


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
                error={hasFirstNameError}
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
                error={hasLastNameError}
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
                error={hasEmailError}
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
                error={hasPasswordError}
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
                error={hasConfirmPasswordError}
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
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <FormSubmitButton
            title="Log In"
            show={true}
            disabled={registerButtonDisabled}
            className={classes.submit}
            onClick={registerAsync}
          />
          <FormSpinner show={isAsyncProcessRunning} />
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
