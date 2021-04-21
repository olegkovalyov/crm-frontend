import React, { FC, ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useRouter } from 'next/router';
import { LicenseType, MemberRole, MemberStatus } from '../../src/interfaces/generated/globalTypes';
import { useRegisterMutation } from '../../src/hooks/graphql/mutations/register/register.mutation.hook';
import FormSubmitButton from '../../src/elements/form-submit-button.component';
import { useRegisterFormValidation } from '../../src/hooks/auth/register-form-validation/register-form-validation.hook';
import { useStyles } from './index.styles';
import FormSpinner from '../../src/elements/form-spinner.component';
import { DASHBOARD_URL, SIGN_IN_URL } from '../../src/constants/route.constants';
import { Copyright } from '../../src/elements/copyright.component';
import FormError from '../../src/elements/form-error.component';
import { setUserAction } from '../../src/redux/auth/auth.actions';
import { AuthInterface } from '../../src/interfaces/auth.interface';


interface PropTypesInterface {
  auth: AuthInterface
  children: never;
}

const SignUp: FC<PropTypesInterface> = (props: PropTypesInterface): ReactElement => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

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

  const licenseType = LicenseType.NONE;

  const {
    registerData,
    inProcessOfRegister,
    registerErrorMessage,
    handleRegister,
  } = useRegisterMutation();

  useEffect(() => {
    if (registerData) {
      dispatch(setUserAction(registerData.register));
    }
  }, [registerData, dispatch]); // eslint-disable-line

  const { auth } = props;
  if (auth.user || registerData) {
    router.push(DASHBOARD_URL);
    return <></>;
  }


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
            title="Sign Up"
            show={true}
            disabled={registerButtonDisabled}
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault();
              return handleRegister(
                MemberStatus.ACTIVE,
                email,
                password,
                firstName,
                lastName,
                [MemberRole.SKYDIVER],
                licenseType);
            }}
          />
          <FormSpinner show={inProcessOfRegister} />
          <FormError className={classes.registerErrorMessage} message={registerErrorMessage} />
          <Grid container justify="flex-end">
            <Grid item>
              <Link className={classes.link} onClick={() => router.push(SIGN_IN_URL)}>
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

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) =>
  // Pass data to the page via props
  ({
    props: {},
  })
;

export default SignUp;



