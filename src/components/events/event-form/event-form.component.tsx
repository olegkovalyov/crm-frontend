import React, { FC, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Paper } from '@material-ui/core';
import { useStyles } from './event-form.styles';
import FormSubmitButton from '../../../elements/form-submit-button.component';
import FormSpinner from '../../../elements/form-spinner.component';
import FormError from '../../../elements/form-error.component';
import MembersList from '../members-list/members-list.component';
import { MemberInterface } from '../../../interfaces/member.interface';
import { EventUserListType } from '../../../constants/event.constants';
import Staff from '../staff/staff.component';
import { MemberRole } from '../../../interfaces/generated/globalTypes';

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
  members: MemberInterface[],
  formTouched: boolean,
  submitButtonEnabled: boolean,
  formErrorMessage: string,
  loading: boolean,
  submitBtnTitle: string,
  submitFn: () => Promise<void>,
  selectedStaff: string[],
  onStaffChange: (e: React.ChangeEvent<HTMLInputElement>, userId: string) => void,
}

const EventForm: FC<PropTypes> = (props: PropTypes): ReactElement => {

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
    members,
    onStaffChange,
    selectedStaff,
    formTouched,
    submitButtonEnabled,
    formErrorMessage,
    loading,
    submitBtnTitle,
    submitFn,
  } = props;

  const instructors = members.filter(member => {
    return (selectedStaff.includes(member.id)
      && (member.roles.includes(MemberRole.TM)
        || member.roles.includes(MemberRole.CAMERAMAN)
        || member.roles.includes(MemberRole.COACH)
      ));
  });

  const packers = members.filter(member => {
    return (selectedStaff.includes(member.id)
      && (member.roles.includes(MemberRole.PACKER)));
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={1}>

          <Grid item xs={12} sm={9}>
            <Paper className={classes.padding}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={8}>
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
                <Grid item xs={12} sm={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      format="dd.MM.yyyy"
                      label='Select date'
                      value={date}
                      onChange={onDateChange}
                      inputVariant='outlined'
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Notes"
                    multiline
                    rows={2}
                    value={notes}
                    onChange={(e) => onNotesChange(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Staff instructors={instructors} packers={packers} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Grid item xs={12} sm={12}>
              <MembersList
                users={members}
                type={EventUserListType.STAFF}
                onUsersListChange={onStaffChange}
                selectedUsers={selectedStaff}
              />
            </Grid>
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
        <FormError className={classes.getEventErrorMessage} message={formErrorMessage} />
      </form>
    </>
  );
};

export default EventForm;
