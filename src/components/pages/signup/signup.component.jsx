import React, {useState} from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles} from '@material-ui/core/styles';
import {loginStart, registerStart, setUser} from '../../../redux/user/user.actions';
import {connect} from 'react-redux';
import validator from 'validator';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  currentUserSelector,
  isLoginInProcessSelector, isRegisterInProcessSelector,
  loginErrorMessageSelector, registerErrorMessageSelector,
} from '../../../redux/user/user.selector';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    cursor: 'pointer',
  },
}));

const SignUp = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [hasPasswordConfirmError, setHasPasswordConfirmError] = useState(true);
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState('');

  const onEmailChange = (value) => {
    setEmail(value);
    if (!validator.isEmail(value)) {
      setHasEmailError(true);
      setEmailErrorMessage('Email is invalid');
    } else {
      setHasEmailError(false);
      setEmailErrorMessage('');
    }
  };

  const onPasswordChange = (value) => {
    setPassword(value);
    if (value.length < 6) {
      setHasPasswordError(true);
      setPasswordErrorMessage('Password must contain at least 6 chars ');
    } else {
      setHasPasswordError(false);
      setPasswordErrorMessage('');
    }
  };

  const onPasswordConfirmChange = (value) => {
    setPasswordConfirm(value);
    if (value !== password
        && value !== ''
    ) {
      setHasPasswordConfirmError(true);
      setPasswordConfirmErrorMessage('Passwords does not match');
    } else {
      setHasPasswordConfirmError(false);
      setPasswordConfirmErrorMessage('');
    }
  };

  const register = (e) => {
    e.preventDefault();
    props.registerStart(
        {
          name: 'Oleh Kovalov',
          email: email,
          password: password,
        },
    );
  };

  let signUpButton = props.isRegisterInProcess
      ? null
      : <Button
          onClick={register}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={hasEmailError || hasPasswordError || hasPasswordConfirmError}
          className={classes.submit}
      >
        Sign Up
      </Button>;

  let spinner = props.isRegisterInProcess
      ? <Grid item xs justify={'center'} container>
        <CircularProgress/>
      </Grid>
      : null;

  let registerErrorMessage = props.registerErrorMessage
      ? <div className={'loginErrorMessage'}>{props.registerErrorMessage}</div>
      : null;

  if (props.currentUser) {
    return (<Redirect
        to={{
          pathname: '/home',
          state: {from: '/signup'},
        }}
    />);
  } else {
    return (
        <React.Fragment>
          <CssBaseline/>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
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
              <TextField
                  value={passwordConfirm}
                  onChange={(e) => onPasswordConfirmChange(e.target.value)}
                  error={hasPasswordConfirmError && passwordConfirm.length > 0}
                  helperText={passwordConfirmErrorMessage}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
              />
              <FormControlLabel
                  control={<Checkbox value="remember" color="primary"/>}
                  label="Remember me"
              />
              {signUpButton}
              {spinner}
              {registerErrorMessage}
              <Grid container>
                <Grid item>
                  <Link className={classes.link} onClick={(e) => {
                    history.push('/signin');
                  }} variant="body2">
                    {'Already have an account? Sign In'}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    currentUser: currentUserSelector(state),
    isRegisterInProcess: isRegisterInProcessSelector(state),
    registerErrorMessage: registerErrorMessageSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerStart: data => dispatch(registerStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
