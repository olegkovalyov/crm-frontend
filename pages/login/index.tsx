import React, { FC, ReactElement } from 'react';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import FormSpinner from '../../src/elements/form-spinner.component';
import FormError from '../../src/elements/form-error.component';
import { FORGOT_PASSWORD_URL, ROUTE_DASHBOARD, ROUTE_REGISTER } from '../../src/constants/route.constants';
import { useStyles } from './index.styles';
import { useLoginFormValidator } from '../../src/hooks/pages/login/login-form-validator/login-form-validator.hook';
import { useLoginFormHandler } from '../../src/hooks/pages/login/login-form-handler/login-form-handler.hook';
import Button from '@material-ui/core/Button';
import { AUTH_LAYOUT } from '../../src/constants/layout.constant';
import { useCurrentUser } from '../../src/hooks/auth/current-user/current-user.hook';


const LogIn: FC = (props): ReactElement => {
  const classes = useStyles();
  const router = useRouter();

  const {
    handleLogin,
    isLoginPending,
    loginErrorMessage,
  } = useLoginFormHandler();

  const {
    handleEmailChange,
    handlePasswordChange,
    formTouched,
    email,
    hasEmailError,
    emailErrorMessage,
    password,
    hasPasswordError,
    passwordErrorMessage,
    loginButtonDisabled,
  } = useLoginFormValidator();

  const { currentUser } = useCurrentUser();
  if (currentUser) {
    router.push(ROUTE_DASHBOARD);
    return <></>;
  }

  return (
    <>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
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
          onChange={(e) => handlePasswordChange(e.target.value)}
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
        <Button
          onClick={(e) => {
            e.preventDefault();
            return handleLogin(email, password);
          }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loginButtonDisabled}
          className={classes.submitButton}
        >
          Log In
        </Button>
        <FormSpinner show={isLoginPending} />
        <FormError className={classes.loginErrorMessage} messages={[loginErrorMessage]} />
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link className={classes.link} onClick={() => router.push(ROUTE_REGISTER)}>
              Don't have an account? Register
            </Link>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link className={classes.link} onClick={() => router.push(FORGOT_PASSWORD_URL)}>
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
};


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
  return {
    props: {
      layout: AUTH_LAYOUT,
    },
  };
};

export default LogIn;
