import React, { FC, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { useStyles } from './reset-password-form.styles';
import FormError from '../../elements/form-error.component';
import FormSpinner from '../../elements/form-spinner.component';
import FormSubmitButton from '../../elements/form-submit-button.component';
import { Copyright } from '../../elements/copyright.component';
import { useResetPasswordFormValidation } from '../../hooks/forms/reset-password-form-validation/register-form-validation.hook';
import { useResetPasswordRequest } from '../../hooks/graphql/reset-password-request/reset-password-request.hook';

interface IResetPasswordPageParams {
  token: string,
}

const ResetPasswordForm: FC = (props): ReactElement => {
  const classes = useStyles();

  const { token } = useParams<IResetPasswordPageParams>();

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
    resetPasswordButtonDisabled
  } = useResetPasswordFormValidation();

  const {
    loading,
    resetPasswordAsync,
    errorMessage
  } = useResetPasswordRequest();

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
              show={!loading}
              disabled={resetPasswordButtonDisabled}
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                return resetPasswordAsync(password, token!);
              }}
            />
            <FormSpinner show={loading} />
            <FormError className={classes.resetPasswordErrorMessage} message={errorMessage} />
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default ResetPasswordForm;
