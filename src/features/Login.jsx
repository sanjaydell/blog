import React, { useState } from 'react'
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

import { auth } from '../firebase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export const Login = () => {
  const [showOtpField, setShowOtpField] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');

  function verifyCaptcha () {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          onSendOtp();
          console.log(response);
        }
      }, auth);
    }
    console.log('captcha', window.recaptchaVerifier);
  }

  function onSendOtp () {
    verifyCaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, mobileNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setShowOtpField(true);
    }).catch((error) => {
      console.log(error);
    });
  }

  function verifyOtp () {
    window.confirmationResult.confirm(otp).then((result) => {
      const user = result.user;
      console.log(user);
    }).catch((error) => {
      console.log(error);
    });
  }
  

  if (showOtpField) {
    return (
      <>
        <TextField value={otp} label="Enter Otp" onChange={(event => setOtp(event.target.value))}/>
        <Button onClick={verifyOtp}>
          Submit
        </Button>
      </>
    )
  }

  return (
    <>
      <TextField value={mobileNumber} lable="Enter Mobile.No" onChange={(event) => setMobileNumber(event.target.value)}/>
      <Button onClick={onSendOtp} id="sign-in-button">
        Send Otp
      </Button>
    </>
  )
}
