import React from "react";
import "./Home.css";
import IndexSection from "./IndexSection";
import InvoiceSection from "./InvoiceSection";
import { Link } from "react-router-dom";

const SectionHome = ({
  name,
  counter,
  subscription,
  useTranslation,
  component,
}) => {
  return (
    <div className="section-home">
      <h1>{useTranslation(name)}</h1>

      <div className="section-home-content">
        {counter === true ? (
          <IndexSection useTranslation={useTranslation} />
        ) : (
          <></>
        )}
        {subscription === true ? (
          <InvoiceSection useTranslation={useTranslation} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SectionHome;
