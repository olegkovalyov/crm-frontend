import React, { FC, ReactElement, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from 'react-redux';
import { useStyles } from './login-form.styles';
import FormError from '../../elements/form-error.component';
import FormSpinner from '../../elements/form-spinner.component';
import FormSubmitButton from '../../elements/form-submit-button.component';
import { validateEmail } from '../../validators/email.validator';
import { validatePassword } from '../../validators/password.validator';
import { loginStartAction } from '../../redux/auth/auth.actions';
import { IRootState } from '../../redux/root.reducer';
import { getLoginFormError, needShowSpinner } from '../../redux/ui/ui.selector';


const LogInForm: FC = (props): ReactElement => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);

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
    setEmail(value);
    if (value.length) {
      const validationResult = validateEmail(value);
      if (validationResult.error) {
        setEmailErrorMessage(validationResult.message);
        setHasEmailError(true);
        return;
      }
    }
    setEmailErrorMessage('');
    setHasEmailError(false);
  };

  const onPasswordChange = (value: string): void => {
    setPassword(value);
    if (value.length) {
      const validationResult = validatePassword(value);
      if (validationResult.error) {
        setPasswordErrorMessage(validationResult.message);
        setHasPasswordError(true);
        return;
      }
    }
    setPasswordErrorMessage('');
    setHasPasswordError(false);
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
              error={hasEmailError && email.length > 0}
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
              error={hasPasswordError && password.length > 0}
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
          </form>
        </div>
      </Container>
    </>
  );
};

export default LogInForm;
