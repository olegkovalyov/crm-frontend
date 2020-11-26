// Core
import React, { FC, ReactElement } from 'react';
import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText, Paper, Typography,
} from '@material-ui/core';
import { useStyles } from './members-list.styles';
import { MemberInterface } from '../../../interfaces/member.interface';
import { EventUserListType } from '../../../constants/event.constants';
import { staffRoles } from '../../../constants/member.constants';

interface PropTypesInterface {
  users: MemberInterface[];
  type: EventUserListType;
  onUsersListChange: (e: React.ChangeEvent<HTMLInputElement>, userId: number) => void;
  selectedUsers: number[];
}

const MembersList: FC<PropTypesInterface> = (props): ReactElement => {
  const classes = useStyles();

  const { users, onUsersListChange, selectedUsers } = props;

  const staff = users.filter((value) => {
    return staffRoles.some(staffRole => value.roles.indexOf(staffRole) >= 0);
  });

  return (
    <Paper className={classes.padding}>
      <Typography component="h6" variant="h6" align="left">
        Select staff:
      </Typography>
      <List className={classes.root}>
        {staff.map((value) => {
          const labelId = `checkbox-list-label-${value.id}`;
          const isChecked = selectedUsers.includes(value.id);
          return (
            <ListItem
              key={value.id}
              dense
            >
              <ListItemText id={labelId} primary={`${value.firstName} ${value.lastName}`} />
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={isChecked}
                  onChange={(e) => onUsersListChange(e, value.id)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default MembersList;
