import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import "../styles/SideMenu.css";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ menuItems, onMenuItemClick, useTranslation }) => {
  const navigate = useNavigate();

  return (
    <List className="side-menu">
      {menuItems.map((item) => (
        <ListItem
          key={item.id}
          onClick={() => {
            onMenuItemClick(item);
            navigate(`/${item.component}`);
          }}
          className="menu-item"
        >
          <ListItemText primary={useTranslation(item.label)} />
        </ListItem>
      ))}
    </List>
  );
};

export default SideMenu;
