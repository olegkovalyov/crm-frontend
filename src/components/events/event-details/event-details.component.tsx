// Core
import React, { FC, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';

interface IPropTypes {
  notes: string;
}

const EventDetails: FC<IPropTypes> = (props): ReactElement => {
  const { notes } = props;

  if (notes === null) {
    return (<></>);
  }

  return (
    <>
      <Typography variant="body2" color="textPrimary">
        {notes}
      </Typography>
    </>
  );
};

export default EventDetails;
