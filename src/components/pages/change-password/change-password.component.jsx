import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from 'react-redux';
import {
  changePasswordErrorMessageSelector,
  changePasswordStatusSelector,
} from '../../../redux/user/user.selector';
import {changePasswordStart} from '../../../redux/user/user.actions';
import {
  CHANGE_PASSWORD_IN_PROCESS_STATUS,
  CHANGE_PASSWORD_SUCCESS_STATUS,
} from '../../../constants/user';
import {green} from '@material-ui/core/colors';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {useParams} from 'react-router-dom';

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

const ChangePassword = (props) => {
  const {token} = useParams();
  const classes = useStyles();

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [hasPasswordConfirmError, setHasPasswordConfirmError] = useState(true);
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState('');

  const onPasswordChange = (value) => {
    setPassword(value);
    if (value.length < 8) {
      setHasPasswordError(true);
      setPasswordErrorMessage('Password must contain at least 8 chars ');
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

  let resetPasswordButton = (props.changePasswordStatus === CHANGE_PASSWORD_IN_PROCESS_STATUS)
      ? null
      : <Button
          onClick={(e) => {
            e.preventDefault();
            props.changePasswordStart({
              token: token,
              password: password,
              passwordConfirm: passwordConfirm,
            });
          }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={hasPasswordError || hasPasswordConfirmError}
          className={classes.submit}
      >
        Change password
      </Button>;

  let spinner = (props.changePasswordStatus === CHANGE_PASSWORD_IN_PROCESS_STATUS)
      ? <Grid item xs justify={'center'} container>
        <CircularProgress/>
      </Grid>
      : null;

  let forgotPasswordErrorMessage = props.changePasswordErrorMessage
      ? <div className={'loginErrorMessage'}>{props.changePasswordErrorMessage}</div>
      : null;

  if (props.changePasswordStatus === CHANGE_PASSWORD_SUCCESS_STATUS) {
    return (
        <React.Fragment>
          <CssBaseline/>
          <div className={classes.paper}>
            <CheckCircleOutlineIcon style={{color: green[500], fontSize: 60}}/>
            <Typography variant={'h5'}>Email was sent to that address containing a link to reset your
              password.</Typography>
          </div>
        </React.Fragment>
    );
  } else {
    return (
        <React.Fragment>
          <CssBaseline/>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Change password
            </Typography>
            <form className={classes.form} noValidate>
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
                  label="New Password"
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
              {resetPasswordButton}
              {spinner}
              {forgotPasswordErrorMessage}
            </form>
          </div>
        </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    changePasswordStatus: changePasswordStatusSelector(state),
    changePasswordErrorMessage: changePasswordErrorMessageSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePasswordStart: data => dispatch(changePasswordStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
