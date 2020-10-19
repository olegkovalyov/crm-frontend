import React, { FC, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useStyles } from './common-event-form.styles';
import FormSubmitButton from '../../../elements/form-submit-button.component';
import FormSpinner from '../../../elements/form-spinner.component';
import FormError from '../../../elements/form-error.component';

interface PropTypes {
  children?: never,
  title: string,
  name: string,
  hasNameError: boolean,
  nameErrorMessage: string,
  onNameChange: (value: string) => void,
  notes: string | null,
  onNotesChange: (value: string) => void,
  date: Date,
  onDateChange: (date: Date | null) => void,
  formTouched: boolean,
  submitButtonEnabled: boolean,
  formErrorMessage: string,
  loading: boolean,
  submitBtnTitle: string,
  submitFn: () => Promise<void>,
}

const CommonEventForm: FC<PropTypes> = (props: PropTypes): ReactElement => {

  const classes = useStyles();

  const {
    title,
    name,
    hasNameError,
    nameErrorMessage,
    onNameChange,
    notes,
    onNotesChange,
    date,
    onDateChange,
    formTouched,
    submitButtonEnabled,
    formErrorMessage,
    loading,
    submitBtnTitle,
    submitFn,
  } = props;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              error={hasNameError && formTouched}
              helperText={nameErrorMessage}
              required
              id="name"
              name="Name"
              label="Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                margin="normal"
                id="date-picker-dialog"
                format="MM/dd/yyyy"
                label='Select date'
                value={date}
                onChange={onDateChange}
                inputVariant='outlined'
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="outlined-multiline-static"
              label="Notes"
              multiline
              rows={4}
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <FormSubmitButton
          title={submitBtnTitle}
          show={true}
          disabled={!submitButtonEnabled}
          className={classes.submit}
          onClick={(e) => {
            e.preventDefault();
            return submitFn();
          }}
        />
        <FormSpinner show={loading} />
        <FormError className={classes.eventErrorMessage} message={formErrorMessage} />
      </form>
    </>
  );
};

export default CommonEventForm;
