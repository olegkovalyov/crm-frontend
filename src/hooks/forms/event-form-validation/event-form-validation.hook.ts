import { useEffect, useState } from 'react';
import {
  eventNameConstrains,
  validateInput,
} from '../../../common/inputValidator';


export const useEventFormValidation = () => {

  const setEvent = (
    name: string,
    date: Date,
    notes: string,
  ): void => {
    setName(name);
    setDate(date);
    setNotes(notes);
  };

  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');

  const [notes, setNotes] = useState('');

  const [date, setDate] = useState(new Date());
  const [hasDateError, setHasDateError] = useState(false);

  const onDateChange = (value: Date | null) => {
    setFormTouched(true);
    if (value === null) {
      setDate(new Date());
      setHasDateError(false);
    } else if (value.toString() === 'Invalid Date') {
      setHasDateError(true);
      setDate(value);
    } else {
      setDate(value);
      setHasDateError(false);
    }
  };

  const [submitButtonEnabled, enableSubmitButton] = useState(false);

  const [formTouched, setFormTouched] = useState(false);

  useEffect(() => {
    if (!hasNameError
      && !hasDateError
      && name.length
    ) {
      enableSubmitButton(true);
    } else {
      enableSubmitButton(false);
    }
  }, [
    name,
    hasNameError,
    hasDateError,
  ]);

  const onNameChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setName, setNameErrorMessage, setHasNameError, eventNameConstrains);
  };

  const onNotesChange = (value: string): void => {
    setFormTouched(true);
    setNotes(value);
  };

  return {
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
    setEvent,
  };

};
