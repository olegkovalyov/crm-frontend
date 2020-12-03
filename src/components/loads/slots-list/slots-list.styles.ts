import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    deleteSlotButton: {
      fontSize: 30,
      cursor: 'pointer',
    },
  }),
);
