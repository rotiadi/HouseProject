import React from "react";
import i18n from "../i18n";
import LanguageIcon from "@mui/icons-material/Language";
import { Box, Container } from "@mui/material";

const LanguageSelector = () => {
  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
    >
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="ro">Romana</option>
    </select>
  );
};

const Footer = () => {
  return (
    <div>
      <Box
        component={"footer"}
        position={"fixed"}
        bottom={0}
        left={0}
        width="100%"
        display={"flex"}
        height="3rem"
        alignItems="center"
        bgcolor={"primary.main"}
      >
        <Container>
          <LanguageIcon />
          <LanguageSelector />
        </Container>
      </Box>
    </div>
  );
};

export default Footer;
