import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  admin: {
    display: 'flex',
  },
  auth: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
