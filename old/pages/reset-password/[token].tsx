import React, { FC, ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useResetPasswordFormValidation } from '../../src/hooks/auth/reset-password-form-validator/register-form-validation.hook';
import { useResetPasswordMutation } from '../../src/hooks/graphql/mutations/reset-password/reset-password.mutation.hook';
import FormSubmitButton from '../../src/elements/form-submit-button.component';
import FormSpinner from '../../src/elements/form-spinner.component';
import FormError from '../../src/elements/form-error.component';
import { Copyright } from '../../src/elements/copyright.component';
import { setUserAction } from '../../src/redux/common/auth/auth.actions';
import { DASHBOARD_URL } from '../../src/constants/route.constants';
import { useStyles } from './index.styles';

const ResetPassword: FC = (props): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const { token } = router.query;

  const {
    onPasswordChange,
    onConfirmPasswordChange,
    password,
    hasPasswordError,
    confirmPassword,
    hasConfirmPasswordError,
    confirmPasswordErrorMessage,
    passwordErrorMessage,
    formTouched,
    resetPasswordButtonDisabled,
  } = useResetPasswordFormValidation();

  const {
    inProcessOfResetPassword,
    resetPasswordErrorMessage,
    resetPasswordData,
    handleResetPassword,
  } = useResetPasswordMutation();

  useEffect(() => {
    if (resetPasswordData) {
      dispatch(setUserAction(resetPasswordData.resetPassword));
      router.push(DASHBOARD_URL);
    }
  }, [resetPasswordData, dispatch]); // eslint-disable-line

  return (
    <>
      <Container maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset password
          </Typography>
          <form className={classes.form} noValidate>
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
            <FormSubmitButton
              title="Reset password"
              show={!inProcessOfResetPassword}
              disabled={resetPasswordButtonDisabled}
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                return handleResetPassword(password, token as string);
              }}
            />
            <FormSpinner show={inProcessOfResetPassword} />
            <FormError className={classes.resetPasswordErrorMessage} message={resetPasswordErrorMessage} />
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

export default ResetPassword;

