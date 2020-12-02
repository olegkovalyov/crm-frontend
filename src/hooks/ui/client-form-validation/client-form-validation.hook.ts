import React, { useEffect, useState } from 'react';
import {
  addressConstrains,
  ageConstrains, certificateConstrains,
  emailConstraints,
  firstNameConstrains,
  lastNameConstrains, phoneConstrains,
  validateInput, weightConstrains,
} from '../../../common/inputValidator';
import { ClientStatus, ClientRole, Gender, PaymentStatus } from '../../../interfaces/generated/globalTypes';

export const useClientFormValidation = () => {

  const setClient = (
    role: ClientRole,
    status: ClientStatus,
    firstName: string,
    lastName: string,
    email: string,
    gender: Gender,
    age: string,
    weight: string,
    address: string,
    phone: string,
    notes: string,
    certificate: string,
    withHandCameraVideo: boolean,
    withCameraman: boolean,
    paymentStatus: PaymentStatus,
  ): void => {
    setClientRole(role);
    setClientStatus(status);
    setGender(gender);
    setAge(age);
    setWeight(weight);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setAddress(address);
    setPhone(phone);
    setNotes(notes);
    setCertificate(certificate);
    setWithHandCameraVideo(withHandCameraVideo);
    setWithCameraman(withCameraman);
    setPaymentStatus(paymentStatus);
  };

  const [clientRole, setClientRole] = useState<ClientRole>(ClientRole.TANDEM);
  const [clientStatus, setClientStatus] = useState<ClientStatus>(ClientStatus.ACTIVE);
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

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(PaymentStatus.NOT_PAID);

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

  const onFirstNameChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setFirstName, setFirstNameErrorMessage, setHasFirstNameError, firstNameConstrains);
  };

  const onLastNameChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setLastName, setLastNameErrorMessage, setHasLastNameError, lastNameConstrains);
  };

  const onEmailChange = (value: string): void => {
    setFormTouched(true);
    if (value.length) {
      validateInput(value, setEmail, setEmailErrorMessage, setHasEmailError, emailConstraints);
    } else {
      setHasEmailError(false);
      setEmailErrorMessage('');
    }
  };

  const onClientRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormTouched(true);
    setClientRole(event.target.value as ClientRole);
  };

  const onClientStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormTouched(true);
    setClientStatus(event.target.value as ClientStatus);
  };

  const onPaymentStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormTouched(true);
    setPaymentStatus(event.target.value as PaymentStatus);
  };

  const onGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormTouched(true);
    setGender(event.target.value as Gender);
  };

  const onAgeChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setAge, setAgeErrorMessage, setHasAgeError, ageConstrains);
  };

  const onWeightChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setWeight, setWeightErrorMessage, setHasWeightError, weightConstrains);
  };

  const onPhoneChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setPhone, setPhoneErrorMessage, setHasPhoneError, phoneConstrains);
  };

  const onAddressChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setAddress, setAddressErrorMessage, setHasAddressError, addressConstrains);
  };

  const onWithCameramanChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormTouched(true);
    setWithCameraman(event.target.checked);
  };

  const onWithHandCameraVideoChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormTouched(true);
    setWithHandCameraVideo(event.target.checked);
  };

  const onNotesChange = (value: string): void => {
    setFormTouched(true);
    setNotes(value);
  };

  const onCertificateChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setCertificate, setCertificateErrorMessage, setHasCertificateError, certificateConstrains);
  };


  return {
    firstName,
    onFirstNameChange,
    hasFirstNameError,
    firstNameErrorMessage,
    lastName,
    onLastNameChange,
    hasLastNameError,
    lastNameErrorMessage,
    email,
    onEmailChange,
    hasEmailError,
    emailErrorMessage,
    clientRole: clientRole,
    onClientRoleChange: onClientRoleChange,
    clientStatus,
    onClientStatusChange,
    paymentStatus,
    onPaymentStatusChange,
    gender,
    onGenderChange,
    age,
    ageErrorMessage,
    hasAgeError,
    onAgeChange,
    weight,
    weightErrorMessage,
    hasWeightError,
    onWeightChange,
    phone,
    phoneErrorMessage,
    hasPhoneError,
    onPhoneChange,
    address,
    addressErrorMessage,
    onAddressChange,
    hasAddressError,
    withCameraman,
    onWithCameramanChange,
    withHandCameraVideo,
    onWithHandCameraVideoChange,
    notes,
    certificate,
    certificateErrorMessage,
    onCertificateChange,
    hasCertificateError,
    onNotesChange,
    formTouched,
    submitButtonEnabled,
    setClient,
  };

};
