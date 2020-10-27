// Core
import React, { FC, ReactElement } from 'react';
import {
  Grid, Paper, Typography,
} from '@material-ui/core';
import { useStyles } from './staff.styles';
import { MemberInterface } from '../../../interfaces/member.interface';

interface PropTypesInterface {
  instructors: MemberInterface[];
  packers: MemberInterface[];
}

const Staff: FC<PropTypesInterface> = (props): ReactElement => {
  const classes = useStyles();

  const { instructors, packers } = props;

  const makeJsx = (users: MemberInterface[]) => {
    let jsx: ReactElement[] | null = null;
    if (users.length) {
      jsx = users.map(user => {
        return <Typography
          key={user.id}
          variant='subtitle1'
        >
          {`${user.firstName} ${user.lastName}`}
        </Typography>;
      });
    }
    return jsx;
  };


  const instructorsJsx = makeJsx(instructors);
  const packersJsx = makeJsx(packers);

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <Typography align='left'>Instructors:</Typography>
          {instructorsJsx}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography align='left'>Packers:</Typography>
          {packersJsx}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Staff;
