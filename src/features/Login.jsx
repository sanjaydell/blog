import React, { useState } from "react";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import { auth } from "../firebase";

export const Login = ({ setUser }) => {
  const [showOtpField, setShowOtpField] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showAlert, setShowAlert] = useState();
  const [otp, setOtp] = useState("");

  function verifyCaptcha() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "sign-in-button",
        {
          size: "invisible",
          callback: (response) => {
            onSendOtp();
          },
        },
        auth
      );
    }
  }

  function onSendOtp() {
    verifyCaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, mobileNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOtpField(true);
      })
      .catch((error) => {
        setShowAlert("Please Enter Valid Phone NUmber");
      });
  }

  function verifyOtp() {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        window.user = result.user;
        window.user.displayName = displayName;
        const user = window.user;
        window.localStorage.setItem("user", JSON.stringify(user));
        setUser(window.user);
      })
      .catch((error) => {
        setShowAlert("Otp is Incorrect");
      });
  }

  let displayContent;

  if (showOtpField) {
    displayContent = (
      <>
        <TextField
          value={otp}
          sx={{ margin: "1rem", width: "80%" }}
          color="success"
          label="Enter Otp"
          error={showAlert}
          onChange={(event) => setOtp(event.target.value)}
        />
        <Button
          onClick={verifyOtp}
          sx={{ margin: "1rem" }}
          variant="contained"
          color="success"
        >
          Submit
        </Button>
      </>
    );
  } else {
    displayContent = (
      <>
        <TextField
          value={mobileNumber}
          sx={{ margin: "1rem", width: "80%" }}
          color="success"
          label="Enter Mobile.No"
          error={showAlert}
          onChange={(event) => setMobileNumber(event.target.value)}
        />
        <TextField
          value={displayName}
          sx={{ margin: "1rem", width: "80%" }}
          color="success"
          label="Enter Your Name"
          onChange={(event) => setDisplayName(event.target.value)}
        />
        <Button
          sx={{ margin: "1rem" }}
          variant="contained"
          color="success"
          onClick={onSendOtp}
          id="sign-in-button"
        >
          Send Otp
        </Button>
      </>
    );
  }

  const formStyle = {
    padding: "2rem",
    height: "70vh",
    width: "30%",
    margin: "auto",
  };
  return (
    <Box marginTop="10vh">
      {showAlert && (
        <Alert
          sx={{ width: "fit-content", margin: "1rem auto" }}
          severity="error"
          onClose={() => {
            setShowAlert(undefined);
          }}
        >
          {showAlert}
        </Alert>
      )}
      <Paper elevation={3} style={formStyle}>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          color="green"
        >
          <img src="/dailyblog.png" alt="logo" style={{ margin: "1rem" }} />
          {displayContent}
        </Box>
      </Paper>
    </Box>
  );
};
