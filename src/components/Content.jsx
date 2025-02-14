import React from "react";
import Home from "./home/Home";
import Activities from "./activities/Activities";

const Content = ({ selectedMenuItem, menuItems, useTranslation }) => {
  const renderContent = () => {
    switch (selectedMenuItem) {
      case "Home":
        return <Home menuItems={menuItems} useTranslation={useTranslation} />;
      case "Activities":
        return <Activities useTranslation={useTranslation} />;

      default:
        return <div>Not implemented </div>;
    }
  };

  return <div className="content">{renderContent()}</div>;
};

export default Content;
