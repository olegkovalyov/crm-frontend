import React, { FC, ReactElement } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { Checkbox, FormControlLabel, FormLabel } from '@material-ui/core';
import { ClientType } from '../../../interfaces/generated/globalTypes';

interface PropTypesInterface {
  clientType: ClientType,
  withHandCameraVideo: boolean,
  onWithHandCameraVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  withCameraman: boolean,
  onWithCameramanChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  className?: string,
}

const ClientVideoOptions: FC<PropTypesInterface> = React.memo((props): ReactElement => {

  const {
    clientType,
    withCameraman,
    onWithCameramanChange,
    withHandCameraVideo,
    onWithHandCameraVideoChange,
  } = props;

  const className = props.className ?? '';

  if (clientType === ClientType.TANDEM) {
    return (
      <FormControl component="fieldset" className={className}>
        <FormLabel component="legend">Type</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={withCameraman}
              onChange={onWithCameramanChange}
            />
          }
          label='Cameraman'
          labelPlacement="end"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={withHandCameraVideo}
              onChange={onWithHandCameraVideoChange}
            />
          }
          label='Hand video'
          labelPlacement="end"
        />
      </FormControl>
    );
  }

  return (
    <></>
  );
});

export default ClientVideoOptions;
