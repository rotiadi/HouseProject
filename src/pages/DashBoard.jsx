import React from "react";
import Home from "../components/home/Home";

const DashBoard = ({ menuItems, useTranslation }) => {
  return (
    <div>
      <Home menuItems={menuItems} useTranslation={useTranslation} />
    </div>
  );
};

export default DashBoard;
