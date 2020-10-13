import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
