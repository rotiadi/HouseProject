import React from "react";

const ActivityCard = ({ useTranslation, cardContent }) => {
  return (
    <div
      style={{
        padding: "0 2rem",
        border: "2px solid black",
        borderRadius: "4rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h3>{useTranslation(cardContent.title)}</h3>
        <p>{cardContent.value}</p>
      </div>
      <div>
        {cardContent.child.map((child, index) => (
          <div key={index}>
            <h4>{useTranslation(child.title)}</h4>
            <p>{child.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;
