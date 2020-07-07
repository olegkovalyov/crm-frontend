import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useStyles } from './edit-user-form.styles';
import { getUserById } from '../../redux/users/users.selector';
import { IRootState } from '../../redux/root.reducer';

interface PropTypes {
  id: string,
  children?: never,
}

const EditUserForm: FC<PropTypes> = (props: PropTypes): ReactElement => {
  const classes = useStyles();
  const user = useSelector((state: IRootState) => getUserById(state, props.id));

  return (
    <>
      {user!.firstName}
    </>
  );
};

export default EditUserForm;
