import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import validator from 'validator';
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from 'react-redux';
import {
  forgotPasswordErrorMessageSelector, forgotPasswordStatusSelector,
} from '../../../../redux/user/user.selector';
import {forgotPasswordStart} from '../../../../redux/user/user.actions';
import {FORGOT_PASSWORD_IN_PROCESS_STATUS, FORGOT_PASSWORD_SUCCESS_STATUS} from '../../../../constants/user';
import {green} from '@material-ui/core/colors';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Container from '@material-ui/core/Container';

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

const ForgotPassword = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

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

  let resetPasswordButton = (props.forgotPasswordStatus === FORGOT_PASSWORD_IN_PROCESS_STATUS)
      ? null
      : <Button
          onClick={(e) => {
            e.preventDefault();
            props.forgotPasswordStart(
                {
                  email: email,
                },
            );
          }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={hasEmailError}
          className={classes.submit}
      >
        Reset password
      </Button>;

  let spinner = (props.forgotPasswordStatus === FORGOT_PASSWORD_IN_PROCESS_STATUS)
      ? <Grid item xs justify={'center'} container>
        <CircularProgress/>
      </Grid>
      : null;

  let forgotPasswordErrorMessage = props.forgotPasswordErrorMessage
      ? <div className={'loginErrorMessage'}>{props.forgotPasswordErrorMessage}</div>
      : null;

  if (props.forgotPasswordStatus === FORGOT_PASSWORD_SUCCESS_STATUS) {
    return (
        <React.Fragment>
          <Container maxWidth={'xs'}>
            <CssBaseline/>
            <div className={classes.paper}>
              <CheckCircleOutlineIcon style={{color: green[500], fontSize: 60}}/>
              <Typography variant={'h5'}>Email was sent to that address containing a link to reset your
                password.</Typography>
            </div>
          </Container>
        </React.Fragment>
    );
  } else {
    return (
        <React.Fragment>
          <Container maxWidth={'xs'}>
            <CssBaseline/>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                Reset password
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
                {resetPasswordButton}
                {spinner}
                {forgotPasswordErrorMessage}
              </form>
            </div>
          </Container>
        </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    forgotPasswordStatus: forgotPasswordStatusSelector(state),
    forgotPasswordErrorMessage: forgotPasswordErrorMessageSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPasswordStart: data => dispatch(forgotPasswordStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
