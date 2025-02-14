import React from "react";
import SectionHome from "./SectionHome";

const Home = ({ menuItems, useTranslation }) => {
  return (
    <div className="home">
      {menuItems.map((item) => (
        <SectionHome
          key={item.id}
          component={item.component}
          name={item.label}
          counter={item.counter}
          subscription={item.subscription}
          useTranslation={useTranslation}
        />
      ))}
    </div>
  );
};

export default Home;
