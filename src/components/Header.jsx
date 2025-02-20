import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";

import {
  Brightness4,
  Brightness7,
  Menu,
  Home,
  ExitToApp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Header = ({
  darkMode,
  setDarkMode,
  setDrawerOpen,
  currentMenu,
  useTranslation,
  setcurrentMenu,
}) => {
  const navigate = useNavigate();

  const handleLoginButton = () => {
    setcurrentMenu({
      id: -1,
      label: "",
      component: "",
      onMain: false,
    });

    navigate("/login");
  };

  const [connectedUser, setConnectedUser] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users/", {
          withCredentials: true,
        });
        setConnectedUser(res.data.username);
      } catch (err) {
        console.log("Not authenticated");
      }
    };
    fetchUser();
  }, []);

  const handleSignOutClick = async () => {
    try {
      await axios.post("http://localhost:5000/users/signout", {
        withCredentials: true,
      });
      setConnectedUser("");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
          <Menu />
        </IconButton>
        <Button
          startIcon={<Home />}
          color="inherit"
          onClick={() => {
            setcurrentMenu({
              id: 1,
              label: "Home",
              component: "Home",
              onMain: false,
            });
            {
              connectedUser ? navigate("/DashBoard") : navigate("/");
            }
          }}
        >
          Home
        </Button>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {useTranslation(currentMenu.label)}
        </Typography>

        <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Button
          color="inherit"
          onClick={handleLoginButton}
          style={{ display: connectedUser ? "none" : "block" }}
        >
          {useTranslation("Login")}
        </Button>
        <div style={{ display: connectedUser ? "block" : "none" }}>
          You are connected as: {connectedUser}
          <Button
            color="secondary"
            startIcon={<ExitToApp />}
            onClick={handleSignOutClick}
          >
            Sign Out
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
