import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary">
        {'Copyright © '}
        {new Date().getFullYear()}
        {'. Clever Money'}
      </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'calc(29% + 60px)',
    bottom: 0,
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
        theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Copyright/>
          </Container>
        </footer>
      </div>
  );
};

export default Footer;
