import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Content from "../components/Content";
import Footer from "../components/Footer";
import LoginPage from "../pages/LoginPage";
import { useTranslation } from "react-i18next";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../styles/main.css";
import { createTheme, CssBaseline, ThemeProvider, Drawer } from "@mui/material";
import RegisterPage from "./RegisterPage";

const MainPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentMenu, setcurrentMenu] = useState({
    id: 1,
    label: "Home",
    component: "Home",
    onMain: false,
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [menuItems, setMenuItems] = useState([
    { id: 1, label: "Activities", component: "Activities", onMain: true },
    {
      id: 2,
      label: "Gas",
      component: "Gas",
      onMain: true,
      counter: true,
      subscription: true,
    },
    {
      id: 3,
      label: "Electricity",
      component: "Electricity",
      onMain: true,
      counter: true,
      subscription: true,
    },
    {
      id: 4,
      label: "Water",
      component: "Water",
      onMain: true,
      counter: true,
      subscription: true,
    },
    { id: 5, label: "Car", component: "Car", onMain: true },
    {
      id: 6,
      label: "InternetPhone",
      component: "InternetPhone",
      onMain: true,
      subscription: true,
    },
    { id: 7, label: "Insurance", component: "Insurance", onMain: true },
    { id: 8, label: "Groceries", component: "Groceries", onMain: true },

    { id: 9, label: "Work", component: "Work", onMain: true },
    { id: 10, label: "Settings", component: "Settings", onMain: false },
  ]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  const handlleMenuItemClick = (menuItem) => {
    setcurrentMenu(menuItem);
    setDrawerOpen(false);
  };

  const { t } = useTranslation();

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setDrawerOpen={setDrawerOpen}
          currentMenu={currentMenu}
          useTranslation={t}
          setcurrentMenu={setcurrentMenu}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Content
                selectedMenuItem={currentMenu?.component}
                menuItems={menuItems.filter((item) => item.onMain)}
                useTranslation={t}
              />
            }
          />
          <Route path="/login" element={<LoginPage useTranslation={t} />} />

          {menuItems.map((item) => (
            <Route
              path={item.component}
              element={
                <Content
                  selectedMenuItem={item.component}
                  menuItems={menuItems.filter((item) => item.onMain)}
                  useTranslation={t}
                />
              }
            />
          ))}

          <Route
            path="/register"
            element={<RegisterPage useTranslation={t} />}
          />
        </Routes>

        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <SideMenu
            menuItems={menuItems}
            onMenuItemClick={(menuItem) => handlleMenuItemClick(menuItem)}
            useTranslation={t}
          />
        </Drawer>

        <Footer />
      </ThemeProvider>
    </Router>
  );
};
export default MainPage;
