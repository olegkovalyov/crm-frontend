// Core
import React, { FC, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './event-details.styles';
import { Paper } from '@material-ui/core';


interface IPropTypes {
  notes: string;
}

const EventDetails: FC<IPropTypes> = (props): ReactElement => {
  const classes = useStyles();
  const { notes } = props;

  if (notes === null) {
    return (<></>);
  }

  return (
    <Paper className={classes.padding}>
      <Typography variant="body2" color="textPrimary">
        {notes}
      </Typography>
    </Paper>
  );
};

export default EventDetails;
