import React from "react";

const HomePage = ({ useTranslation }) => {
  return (
    <div>
      <h1>Welcome to this app.</h1>
      <article>
        For testing please log in using the following credentials:
        <ul>
          <li>Username: guest</li>
          <li>Password: guest</li>
        </ul>
      </article>
    </div>
  );
};

export default HomePage;
