import React, { useEffect, useState } from 'react';
import {
  addressConstrains,
  ageConstrains, certificateConstrains,
  emailConstraints,
  firstNameConstrains,
  lastNameConstrains, phoneConstrains,
  validateInput, weightConstrains,
} from '../../../common/inputValidator';
import { ClientStatus, ClientRole, Gender } from '../../../interfaces/generated/globalTypes';
import { ClientInterface } from '../../../interfaces/client.interface';

export const useClientFormValidation = () => {

  const setClient = (client: ClientInterface): void => {
    setClientRole(client.role);
    setStatus(client.status);
    setGender(client.gender);
    setAge(String(client.age));
    setWeight(String(client.weight));
    setFirstName(client.firstName);
    setLastName(client.lastName);
    setEmail(client.email);
    setAddress(client.address);
    setPhone(client.phone);
    setNotes(client.notes);
    setCertificate(client.certificate);
    setWithHandCameraVideo(client.withHandCameraVideo);
    setWithCameraman(client.withCameraman);
  };

  const [clientRole, setClientRole] = useState<ClientRole>(ClientRole.TANDEM);
  const [status, setStatus] = useState<ClientStatus>(ClientStatus.PENDING);
  const [gender, setGender] = useState<Gender>(Gender.MALE);

  const [age, setAge] = useState('');
  const [hasAgeError, setHasAgeError] = useState(false);
  const [ageErrorMessage, setAgeErrorMessage] = useState('');

  const [weight, setWeight] = useState('');
  const [hasWeightError, setHasWeightError] = useState(false);
  const [weightErrorMessage, setWeightErrorMessage] = useState('');


  const [firstName, setFirstName] = useState('');
  const [hasFirstNameError, setHasFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');

  const [lastName, setLastName] = useState('');
  const [hasLastNameError, setHasLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [phone, setPhone] = useState('');
  const [hasPhoneError, setHasPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');

  const [address, setAddress] = useState('');
  const [hasAddressError, setHasAddressError] = useState(false);
  const [addressErrorMessage, setAddressErrorMessage] = useState('');

  const [withHandCameraVideo, setWithHandCameraVideo] = useState(false);
  const [withCameraman, setWithCameraman] = useState(false);

  const [notes, setNotes] = useState('');

  const [certificate, setCertificate] = useState('');
  const [hasCertificateError, setHasCertificateError] = useState(false);
  const [certificateErrorMessage, setCertificateErrorMessage] = useState('');

  const [submitButtonEnabled, enableSubmitButton] = useState(false);
  const [formTouched, setFormTouched] = useState(false);

  useEffect(() => {
    if (!hasEmailError
      && !hasFirstNameError
      && !hasLastNameError
      && !hasAgeError
      && !hasWeightError
      && !hasPhoneError
      && email.length
      && firstName.length
      && lastName.length
      && phone.length
      && age
      && weight
    ) {
      enableSubmitButton(true);
    } else {
      enableSubmitButton(false);
    }
  }, [
    hasEmailError,
    hasFirstNameError,
    hasLastNameError,
    hasAgeError,
    hasWeightError,
    hasPhoneError,
    email,
    firstName,
    lastName,
    age,
    weight,
    phone,
  ]); // eslint-disable-line

  const handleFirstNameChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setFirstName, setFirstNameErrorMessage, setHasFirstNameError, firstNameConstrains);
  };

  const handleLastNameChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setLastName, setLastNameErrorMessage, setHasLastNameError, lastNameConstrains);
  };

  const handleEmailChange = (value: string): void => {
    setFormTouched(true);
    if (value.length) {
      validateInput(value, setEmail, setEmailErrorMessage, setHasEmailError, emailConstraints);
    } else {
      setHasEmailError(false);
      setEmailErrorMessage('');
    }
  };

  const handleClientRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormTouched(true);
    setClientRole(event.target.value as ClientRole);
  };

  const handleClientStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormTouched(true);
    setStatus(event.target.value as ClientStatus);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormTouched(true);
    setGender(event.target.value as Gender);
  };

  const handleAgeChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setAge, setAgeErrorMessage, setHasAgeError, ageConstrains);
  };

  const handleWeightChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setWeight, setWeightErrorMessage, setHasWeightError, weightConstrains);
  };

  const handlePhoneChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setPhone, setPhoneErrorMessage, setHasPhoneError, phoneConstrains);
  };

  const handleAddressChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setAddress, setAddressErrorMessage, setHasAddressError, addressConstrains);
  };

  const handleWithCameramanChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormTouched(true);
    setWithCameraman(event.target.checked);
  };

  const handleWithHandCameraVideoChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormTouched(true);
    setWithHandCameraVideo(event.target.checked);
  };

  const handleNotesChange = (value: string): void => {
    setFormTouched(true);
    setNotes(value);
  };

  const handleCertificateChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setCertificate, setCertificateErrorMessage, setHasCertificateError, certificateConstrains);
  };


  return {
    firstName,
    handleFirstNameChange,
    hasFirstNameError,
    firstNameErrorMessage,
    lastName,
    handleLastNameChange,
    hasLastNameError,
    lastNameErrorMessage,
    email,
    handleEmailChange,
    hasEmailError,
    emailErrorMessage,
    clientRole,
    handleClientRoleChange,
    status,
    handleClientStatusChange,
    gender,
    handleGenderChange,
    age,
    ageErrorMessage,
    hasAgeError,
    handleAgeChange,
    weight,
    weightErrorMessage,
    hasWeightError,
    handleWeightChange,
    phone,
    phoneErrorMessage,
    hasPhoneError,
    handlePhoneChange,
    address,
    addressErrorMessage,
    handleAddressChange,
    hasAddressError,
    withCameraman,
    handleWithCameramanChange,
    withHandCameraVideo,
    handleWithHandCameraVideoChange,
    notes,
    certificate,
    certificateErrorMessage,
    handleCertificateChange,
    hasCertificateError,
    handleNotesChange,
    formTouched,
    submitButtonEnabled,
    setClient,
  };

};
