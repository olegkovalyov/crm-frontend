import React, { FC, ReactElement } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

interface IPropTypes {
  isOpen: boolean,
}

const LoadBackdrop: FC<IPropTypes> = (props: IPropTypes): ReactElement => {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.isOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default LoadBackdrop;
