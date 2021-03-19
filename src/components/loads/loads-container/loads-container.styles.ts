import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  slotTabs: {
    flexGrow: 1,
    width: '98%',
    backgroundColor: theme.palette.background.paper,
  },
  loadTabs: {
    flexGrow: 1,
    width: '98%',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  unassignedContainer: {
    marginTop: theme.spacing(3),
  }
}));
