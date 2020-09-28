import React, { FC, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import HomeIcon from '@material-ui/icons/Home';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './not-found.styles';
import { DASHBOARD_URL } from '../../constants/route.constants';

const NotFound: FC = (props): ReactElement => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h2" component="h2" align='center'>
              Page not found
              <Link
                href="#"
                onClick={(e: React.MouseEvent) => {
                  history.push(DASHBOARD_URL);
                }}
              >
                <ArrowForwardIcon style={{ fontSize: 40 }} />
                <HomeIcon style={{ fontSize: 40 }} />
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default NotFound;
