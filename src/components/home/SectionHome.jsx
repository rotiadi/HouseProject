import React from "react";
import "./Home.css";
import IndexSection from "./IndexSection";
import InvoiceSection from "./InvoiceSection";
import { Link } from "react-router-dom";
import Activities from "./Activities";
import Utility from "../utilities/Utility";

const SectionHome = ({
  name,
  counter,
  subscription,
  useTranslation,
  component,
}) => {
  return (
    <div className="section-home">
      <h1>
        <Link to={`/${component}`} className="section-home-title">
          {useTranslation(name)}
        </Link>
      </h1>
      <div className="section-home-content">
        {counter === true && <IndexSection useTranslation={useTranslation} />}

        {subscription === true && (
          <InvoiceSection useTranslation={useTranslation} />
        )}
      </div>
      {name === "Activities" && <Activities useTranslation={useTranslation} />}
    </div>
  );
};

export default SectionHome;
