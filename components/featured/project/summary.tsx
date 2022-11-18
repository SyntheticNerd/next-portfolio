import React from "react";
import classes from "./project.module.scss";

const Summary = () => {
  return (
    <div className={classes.summary}>
      <h2>Creating a Shop.Tesla Clone with a Team</h2>
      <p>
        In this project I had the opportunity to bring a UX designers work to
        life. I used animations and paralax effects to keep users engaged.
      </p>
      <div>
        <button>Read Article</button>
        <button>Github</button>
        <button>Hosted Site</button>
      </div>
    </div>
  );
};

export default Summary;
