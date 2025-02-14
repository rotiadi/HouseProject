import React from "react";
import i18n from "../i18n";
import LanguageIcon from "@mui/icons-material/Language";

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
    <footer>
      <LanguageIcon />
      <LanguageSelector />
      <p>Contact us: info@example.com</p>
      <p>Phone: (123) 456-7890</p>
      <p>Address: 123 Main St, Anytown, USA</p>
    </footer>
  );
};

export default Footer;
