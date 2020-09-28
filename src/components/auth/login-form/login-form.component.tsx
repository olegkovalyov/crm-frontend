import React, { FC, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { useStyles } from './login-form.styles';
import FormError from '../../../elements/form-error.component';
import FormSpinner from '../../../elements/form-spinner.component';
import FormSubmitButton from '../../../elements/form-submit-button.component';
import { Copyright } from '../../../elements/copyright.component';
import { useLoginFormValidation } from '../../../hooks/forms/login-form-validation/login-form-validation.hook';
import { useLoginRequest } from '../../../hooks/graphql/login-request/login-request.hook';
import { FORGOT_PASSWORD_URL, REGISTER_URL } from '../../../constants/route.constants';

const LogInForm: FC = (props): ReactElement => {
  const classes = useStyles();
  const history = useHistory();

  const {
    onEmailChange,
    onPasswordChange,
    formTouched,
    email,
    hasEmailError,
    emailErrorMessage,
    password,
    hasPasswordError,
    passwordErrorMessage,
    loginButtonDisabled,
  } = useLoginFormValidation();

  const {
    loading,
    errorMessage,
    loginAsync,
  } = useLoginRequest();

  return (
    <>
      <Container maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              error={hasEmailError && formTouched}
              helperText={emailErrorMessage}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              error={hasPasswordError && formTouched}
              helperText={passwordErrorMessage}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormSubmitButton
              title="Log In"
              show={!loading}
              disabled={loginButtonDisabled}
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                return loginAsync(email, password);
              }}
            />
            <FormSpinner show={loading} />
            <FormError className={classes.loginErrorMessage} message={errorMessage} />
            <Grid container justify="flex-end">
              <Grid item>
                <Link className={classes.link} onClick={() => history.push(REGISTER_URL)}>
                  Don't have an account? Register
                </Link>
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item>
                <Link className={classes.link} onClick={() => history.push(FORGOT_PASSWORD_URL)}>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default LogInForm;
