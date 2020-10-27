// Core
import React, { FC, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import { useStyles } from './event-details.styles';


interface PropTypesInterface {
  notes: string;
}

const EventDetails: FC<PropTypesInterface> = (props): ReactElement => {
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
