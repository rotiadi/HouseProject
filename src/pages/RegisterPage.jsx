import { Box, TextField, Button, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const RegisterPage = ({ useTranslation }) => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
    rePassword: "",
    email: "",
    fullname: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleClickRegister = () => {
    // TODO: implement check input values

    axios
      .post("http://localhost:5000/users/register", user)
      .then((res) => {
        setMessage("Register successfully");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setMessage(err.response.data.message);
      });
  };

  const handlePasswordChange = (password) => {
    setUser({ ...user, password: password });
    if (
      password !== user.rePassword &&
      user.rePassword !== "" &&
      password !== ""
    ) {
      setMessage("Password and re-password are not the same");
    } else {
      setMessage("");
    }
  };

  const handleRePasswordChange = (password) => {
    setUser({ ...user, rePassword: password });
    console.log(
      password !== user.password && user.password !== "" && password !== ""
    );
    console.log("password", password);
    console.log("user.Password", user.password);

    if (password !== user.password && user.password !== "" && password !== "") {
      setMessage("Password and re-password are not the same");
    } else {
      setMessage("");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1 style={{ alignSelf: "center" }}>
        {useTranslation("Registration form")}
      </h1>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="form-login"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          marginTop: "3rem",
        }}
      >
        <TextField
          id="userName"
          label={useTranslation("User Name")}
          required
          style={{ width: "20%" }}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <TextField
          id="password"
          label={useTranslation("Password")}
          type={showPassword ? "text" : "password"}
          fullWidth
          required
          style={{ width: "20%" }}
          onChange={(e) => handlePasswordChange(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          id="re-password"
          label={useTranslation("re-Password")}
          type={showRePassword ? "text" : "password"}
          fullWidth
          required
          style={{ width: "20%" }}
          onChange={(e) => handleRePasswordChange(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => {
                    setShowRePassword(!showRePassword);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {showRePassword ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          id="email"
          label={useTranslation("Email Address")}
          type="email"
          required
          style={{ width: "20%" }}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <TextField
          id="fullname"
          label={useTranslation("Full Name")}
          required
          style={{ width: "20%" }}
          onChange={(e) => setUser({ ...user, fullname: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ width: "10%" }}
          onClick={handleClickRegister}
        >
          {useTranslation("Register")}
        </Button>

        <p>{message}</p>
      </Box>
    </div>
  );
};

export default RegisterPage;
