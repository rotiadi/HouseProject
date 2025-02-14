import { Box, TextField, Button } from "@mui/material";
import React from "react";

const RegisterPage = ({ useTranslation }) => {
  return (
    <div>
      <h1>This is the registration page</h1>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="form-login"
      >
        <TextField id="userName" label={useTranslation("User Name")} required />

        <TextField
          id="password"
          label={useTranslation("Password")}
          type="password"
          required
        />

        <TextField
          id="re-password"
          label={useTranslation("re-Password")}
          type="password"
          required
        />

        <TextField
          id="email"
          label={useTranslation("Email Address")}
          type="email"
          required
        />

        <TextField id="name" label={useTranslation("Full Name")} required />
        <Button variant="contained" color="primary">
          {useTranslation("Register")}
        </Button>
      </Box>
    </div>
  );
};

export default RegisterPage;
