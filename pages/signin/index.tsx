import React, { FC, ReactElement } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import FormSubmitButton from '../../src/elements/form-submit-button.component';
import FormSpinner from '../../src/elements/form-spinner.component';
import FormError from '../../src/elements/form-error.component';
import { FORGOT_PASSWORD_URL, REGISTER_URL } from '../../src/constants/route.constants';
import { useStyles } from './index.styles';
import { Copyright } from '../../src/elements/copyright.component';
import { useLoginFormValidation } from '../../src/hooks/ui/login-form-validation/login-form-validation.hook';
import { useLoginMutation } from '../../src/hooks/graphql/mutations/login/login.mutation.hook';
import { initializeApollo } from '../../src/http/graphql.client';

const LogInForm: FC = (props): ReactElement => {
  const classes = useStyles();
  const router = useRouter();

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
    inProcessOfLogin,
    loginErrorMessage,
    loginAsync,
  } = useLoginMutation();

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
              show={!inProcessOfLogin}
              disabled={loginButtonDisabled}
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                return loginAsync(email, password);
              }}
            />
            <FormSpinner show={inProcessOfLogin} />
            <FormError className={classes.loginErrorMessage} message={loginErrorMessage} />
            <Grid container justify="flex-end">
              <Grid item>
                <Link className={classes.link} onClick={() => router.push(REGISTER_URL)}>
                  Don't have an account? Register
                </Link>
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item>
                <Link className={classes.link} onClick={() => router.push(FORGOT_PASSWORD_URL)}>
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

export async function getServerSideProps(context) {
  // Fetch data from external API
  const { refreshToken } = context.req.cookies;

  if (refreshToken) {
    const client = initializeApollo();
    const refreshTokenQuery = gql`
        query RefreshToken {
            refreshToken {
                payload {
                    id,
                    userId,
                    status,
                    firstName,
                    lastName,
                    email,
                    roles,
                    licenseType,
                    createdAt,
                    updatedAt,
                },
                accessToken,
            }
        }
    `;
    try {
      const result = await client.query({
        query: refreshTokenQuery,
        context: {
          headers: {
            refreshToken,
          },
        },
      });
      console.log(result);
    } catch (e) {
      console.log(e.message);
    }
  }

  // Pass data to the page via props
  return { props: {} };
}
