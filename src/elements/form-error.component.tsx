// Core
import React, { FC, ReactElement } from 'react';

interface IPropTypes {
  messages: string[],
  className: string,
  children?: never,
}

const FormError: FC<IPropTypes> = ({ messages, className }): ReactElement => {

  if (messages.length) {
    let key = 0;
    return (
      <>
        {messages.map((message) => {
          key = key + 1;
          return <div key={key} className={className}>{message}</div>;
        })}
      </>
    );
  }
  return (<></>);
};

export default FormError;
