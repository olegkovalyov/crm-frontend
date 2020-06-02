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
import { useStyles } from './forgot-password-form.styles';
import FormError from '../../elements/form-error.component';
import FormSpinner from '../../elements/form-spinner.component';
import FormSubmitButton from '../../elements/form-submit-button.component';
import { url } from '../../constants/url';
import { Copyright } from '../../elements/copyright.component';
import { useForgotPasswordFormValidation } from '../../hooks/forgot-password-form-validation/forgot-password-form-validation.hook';
import { useForgotPasswordFormRequest } from '../../hooks/forgot-password-form-request/forgot-password-form-request.hook';

const ForgotPasswordForm: FC = (props): ReactElement => {
  const classes = useStyles();
  const history = useHistory();

  const {
    onEmailChange,
    formTouched,
    email,
    hasEmailError,
    emailErrorMessage,
    resetButtonDisabled,
  } = useForgotPasswordFormValidation();

  const {
    loading,
    forgotPasswordAsync,
    data,
    errorMessage,
  } = useForgotPasswordFormRequest();

  if (data) {
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
              show={!loading}
              disabled={resetButtonDisabled}
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                return forgotPasswordAsync(email);
              }}
            />
            <FormSpinner show={loading} />
            <FormError className={classes.forgotPasswordErrorMessage} message={errorMessage} />
            <Grid container justify="flex-end">
              <Grid item>
                <Link className={classes.link} onClick={() => history.push(url.login)}>
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

export default ForgotPasswordForm;
