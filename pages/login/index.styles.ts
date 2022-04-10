import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    cursor: 'pointer',
  },
  loginErrorMessage: {
    color: 'red',
    fontSize: '14px',
    textAlign: 'center',
  },
}));
