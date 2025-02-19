import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ useTranslation }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: true,
    password: true,
    first: true,
  });

  const navigate = useNavigate();

  const handleLoginClick = () => {
    setErrors({ ...errors, first: false });

    if (errors.username || errors.password) {
      console.log("Please fill in all fields");

      return;
    } else {
      axios
        .post("http://localhost:5000/users/login", user, {
          withCredentials: true,
        })
        .then((res) => {
          setMessage("Login successfully");
          console.log(message);
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          setMessage(err.response.data.message);
        });
    }
  };

  return (
    <div className="login-page">
      <h1 style={{ alignSelf: "center" }}> {useTranslation("Login Page")}</h1>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="form-login"
      >
        <TextField
          id="userName"
          label={useTranslation("User Name")}
          required
          error={errors.username && !errors.first}
          sx={{ marginTop: "3rem", width: "30%" }}
          onChange={(e) => {
            setUser({ ...user, username: e.target.value });
            setErrors({
              ...errors,
              username: e.target.value ? false : true,
            });
          }}
        />

        <TextField
          id="password"
          label={useTranslation("Password")}
          type={showPassword ? "text" : "password"}
          required
          error={errors.password && !errors.first}
          sx={{ marginTop: "3rem", width: "30%" }}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
            setErrors({
              ...errors,
              password: e.target.value ? false : true,
            });
          }}
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

        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "3rem", width: "30%" }}
          onClick={handleLoginClick}
        >
          {useTranslation("Login")}
        </Button>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "3rem", width: "30%" }}
        >
          {useTranslation("If you don't have an account, please ")}
          <Link to="/register">{useTranslation("register")}</Link>
        </Typography>
      </Box>
    </div>
  );
};

export default LoginPage;
