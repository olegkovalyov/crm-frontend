import React, { FC, ReactElement } from 'react';
import { Box, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { LoadInterface } from '../../../interfaces/load.interface';
import { useStyles } from './single-load.styles';
import SlotList from '../slots-list/slots-list.component';


interface IPropTypes {
  load: LoadInterface,
  handleDeleteLoad: (loadId: number) => void,
  isLoading: boolean;
}

const SingleLoad: FC<IPropTypes> = (props: IPropTypes): ReactElement => {
  const classes = useStyles();

  const {
    isLoading,
    load,
    handleDeleteLoad,
  } = props;


  return (
    <>
      <Box p={3}>
        <SlotList
          isLoading={isLoading}
          slots={load.slots}
        />
        <Button
          variant="contained"
          color="secondary"
          size="large"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={(e) => handleDeleteLoad(load.id)}
        >
          Delete Load
        </Button>
      </Box>
    </>
  );
};

export default SingleLoad;
