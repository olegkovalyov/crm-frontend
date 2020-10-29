import React, { FC, ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';

interface PropTypesInterface {
  notes: string,
  onNotesChange: (value: string) => void,
  className?: string,
}

const Notes: FC<PropTypesInterface> = React.memo((props): ReactElement => {

  const {
    notes,
    onNotesChange,
  } = props;

  const className = props.className ?? '';

  return (
    <TextField
      className={className}
      value={notes}
      onChange={(e) => onNotesChange(e.target.value)}
      id="notes"
      name="notes"
      label="Notes"
      fullWidth
      multiline
      rows={4}
      variant='outlined'
    />
  );
});

export default Notes;
