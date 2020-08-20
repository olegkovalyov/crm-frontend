import React, { FC, ReactElement } from 'react';
import { useStyles } from './edit-user-form.styles';

interface PropTypes {
  id: string,
  children?: never,
}

const EditUserForm: FC<PropTypes> = (props: PropTypes): ReactElement => {
  const classes = useStyles();
  // const user = useSelector((state: IRootState) => getUserById(state, props.id));

  return (
    <>

    </>
  );
};

export default EditUserForm;
