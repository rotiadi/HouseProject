import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";

import { Brightness4, Brightness7, Menu, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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
            navigate("/");
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
        <Button color="inherit" onClick={handleLoginButton}>
          {useTranslation("Login")}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
