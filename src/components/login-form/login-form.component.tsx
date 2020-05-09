import React, { FC, ReactElement, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import validate from 'validate.js';
import { useStyles } from './login-form.styles';
import FormError from '../../elements/form-error.component';
import FormSpinner from '../../elements/form-spinner.component';
import FormSubmitButton from '../../elements/form-submit-button.component';
import { loginStartAction } from '../../redux/auth/auth.actions';
import { IRootState } from '../../redux/root.reducer';
import { getLoginFormError, needShowSpinner } from '../../redux/ui/ui.selector';
import { url } from '../../constants/url';
import { Copyright } from '../../elements/copyright.component';
import { emailConstraints, passwordConstrains, validateInput } from '../../common/inputValidator';


const LogInForm: FC = (props): ReactElement => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);
  const [formTouched, setFormTouched] = useState(false);

  useEffect(() => {
    if (!hasEmailError
      && !hasPasswordError
      && email.length
      && password.length
    ) {
      setLoginButtonDisabled(false);
    } else {
      setLoginButtonDisabled(true);
    }
  }, [hasEmailError, hasPasswordError, email, password]);


  const isAsyncProcessRunning = useSelector((state: IRootState) => needShowSpinner(state));
  const errorMessage = useSelector((state: IRootState) => getLoginFormError(state));

  const onEmailChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setEmail, setEmailErrorMessage, setHasEmailError, emailConstraints);
  };

  const onPasswordChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setPassword, setPasswordErrorMessage, setHasPasswordError, passwordConstrains);
  };

  const loginAsync = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(loginStartAction(
      {
        email,
        password,
      },
    ));
  };


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
              show={!isAsyncProcessRunning}
              disabled={loginButtonDisabled}
              className={classes.submit}
              onClick={loginAsync}
            />
            <FormSpinner show={isAsyncProcessRunning} />
            <FormError className={classes.loginErrorMessage} message={errorMessage} />
            <Grid container justify="flex-end">
              <Grid item>
                <Link className={classes.link} onClick={() => history.push(url.register)}>
                  Don't have an account? Register
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
