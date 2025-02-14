import React, { useState, useEffect } from "react";

import OnGoing from "./OnGoing";
import Todo from "./Todo";
import "./Activities.css";

const Activities = ({ useTranslation }) => {
  return (
    <div>
      <OnGoing useTranslation={useTranslation} />
      <Todo useTranslation={useTranslation} />
    </div>
  );
};

export default Activities;
