import { Box, TextField, Button, Typography } from "@mui/material";
import React from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";

const LoginPage = ({ useTranslation }) => {
  return (
    <div className="login-page">
      <h1>{useTranslation("Login Page")}</h1>
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

        <Button variant="contained" color="primary">
          {useTranslation("Login")}
        </Button>
        <Typography variant="body2" color="textSecondary">
          {useTranslation("If you don't have an account, please ")}
          <Link to="/register">{useTranslation("register")}</Link>
        </Typography>
      </Box>
    </div>
  );
};

export default LoginPage;
