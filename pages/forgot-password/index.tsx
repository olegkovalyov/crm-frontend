import React, { FC, ReactElement } from 'react';
import { NextPageContext } from 'next';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { useRouter } from 'next/router';
import FormSubmitButton from '../../src/elements/form-submit-button.component';
import FormSpinner from '../../src/elements/form-spinner.component';
import FormError from '../../src/elements/form-error.component';
import { DASHBOARD_URL, SIGN_IN_URL } from '../../src/constants/route.constants';
import { useForgotPasswordMutation } from '../../src/hooks/graphql/mutations/forgot-password/forgot-password.mutation.hook';
import { useForgotPasswordFormValidation } from '../../src/hooks/ui/forgot-password-form-validation/forgot-password-form-validation.hook';
import { Copyright } from '../../src/elements/copyright.component';
import { useStyles } from './index.styles';


const ForgotPassword: FC = (props): ReactElement => {
  const classes = useStyles();
  const router = useRouter();

  const {
    onEmailChange,
    formTouched,
    email,
    hasEmailError,
    emailErrorMessage,
    resetButtonDisabled,
  } = useForgotPasswordFormValidation();

  const {
    inProcessOfForgotPassword,
    forgotPasswordData,
    forgotPasswordErrorMessage,
    handleForgotPassword,
  } = useForgotPasswordMutation();

  if (forgotPasswordData) {
    return (
      <>
        <Container maxWidth='xs'>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h6" component="h2">
              Further instructions have been sent to your e-mail address.
            </Typography>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot password
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
            <FormSubmitButton
              title="Reset password"
              show={!inProcessOfForgotPassword}
              disabled={resetButtonDisabled}
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                return handleForgotPassword(email);
              }}
            />
            <FormSpinner show={inProcessOfForgotPassword} />
            <FormError className={classes.forgotPasswordErrorMessage} message={forgotPasswordErrorMessage} />
            <Grid container justify="flex-end">
              <Grid item>
                <Link className={classes.link} onClick={() => router.push(SIGN_IN_URL)}>
                  Back to login
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

// Pass data to the page via props
export const getServerSideProps = async (context: NextPageContext) => {
  const cookie = require('cookie');
  const cookies = context.req.headers.cookie ? cookie.parse(context.req.headers.cookie) : {};
  if (cookies.refreshToken) {
    return {
      redirect: {
        destination: DASHBOARD_URL,
      },
    };
  }

  return {
    props: {},
  };
};

export default ForgotPassword;

