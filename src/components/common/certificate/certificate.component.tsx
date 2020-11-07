import React, { FC, ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';

interface PropTypesInterface {
  certificate: string,
  onCertificateChange: (value: string) => void,
  hasCertificateError: boolean,
  certificateErrorMessage: string,
  className?: string,
  formTouched: boolean,
}

const Certificate: FC<PropTypesInterface> = React.memo((props): ReactElement => {

  const {
    certificate,
    onCertificateChange,
    hasCertificateError,
    certificateErrorMessage,
    formTouched,
  } = props;

  const className = props.className ?? '';

  return (
    <TextField
      className={className}
      value={certificate}
      onChange={(e) => onCertificateChange(e.target.value)}
      id="certificate"
      name="certificate"
      label="Certificate"
      error={hasCertificateError && formTouched}
      helperText={certificateErrorMessage}
      fullWidth
      variant='outlined'
    />
  );
});

export default Certificate;
