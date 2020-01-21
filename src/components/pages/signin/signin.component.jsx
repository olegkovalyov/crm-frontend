import React, {useState} from 'react';
import {connect} from 'react-redux';
import {loginStart} from '../../../redux/user/user.actions';
import {useHistory, Redirect} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles} from '@material-ui/core/styles';
import validator from 'validator';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../../styles/signin.styles.css';
import {
  currentUserSelector,
  isLoginInProcessSelector,
  loginErrorMessageSelector,
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

const SignIn = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasEmailError, setHasEmailError] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const onEmailChange = (email) => {
    setEmail(email);
    if (!validator.isEmail(email)) {
      setHasEmailError(true);
      setEmailErrorMessage('Email is invalid');
    } else {
      setHasEmailError(false);
      setEmailErrorMessage('');
    }
  };

  const onPasswordChange = (password) => {
    setPassword(password);
    if (password.length < 8) {
      setHasPasswordError(true);
      setPasswordErrorMessage('Password must contain at least 8 chars ');
    } else {
      setHasPasswordError(false);
      setPasswordErrorMessage('');
    }
  };

  const login = (e) => {
    e.preventDefault();
    props.loginStart(
        {
          email: email,
          password: password,
        },
    );
  };

  let signInButton = props.isLoginInProcess
      ? null
      : <Button
          onClick={login}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={hasPasswordError || hasEmailError}
          className={classes.submit}
      >
        Sign In
      </Button>;

  let spinner = props.isLoginInProcess
      ? <Grid item xs justify={'center'} container>
        <CircularProgress/>
      </Grid>
      : null;

  let loginErrorMessage = props.loginErrorMessage
      ? <div className={'loginErrorMessage'}>{props.loginErrorMessage}</div>
      : null;

  if (props.currentUser) {
    return (<Redirect
        to={{
          pathname: '/home',
          state: {from: '/signin'},
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
              {signInButton}
              {spinner}
              {loginErrorMessage}
              <Grid container>
                <Grid item xs>
                  <Link className={classes.link}
                        onClick={(e) => {
                          history.push('/forgot-password');
                        }}
                        variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link className={classes.link} onClick={(e) => {
                    history.push('/signup');
                  }} variant="body2">
                    {'Don\'t have an account? Sign Up'}
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
    isLoginInProcess: isLoginInProcessSelector(state),
    loginErrorMessage: loginErrorMessageSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginStart: data => dispatch(loginStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
