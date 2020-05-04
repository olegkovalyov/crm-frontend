// Core
import React, { FC, ReactElement } from 'react';

interface IPropTypes {
  message: string|null,
  className: string,
  children?: never,
}

const FormError: FC<IPropTypes> = ({ message, className }): ReactElement => {

  if (message) {
    return (
      <>
        <div className={className}>{message}</div>
      </>
    );
  }
  return (<></>);
};

export default FormError;
