import React from "react";
import Pictures from "./pictures";
import classes from "./project.module.scss";
import Summary from "./summary";

const Project = () => {
  return (
    <div className={classes.project}>
      <Summary />
      <div className={classes.imageContainer}>
        <Pictures />
        <div className={classes.techStack}>
          <b>React</b>
          <b>Redux</b>
          <b>Styled Components</b>
        </div>
      </div>
    </div>
  );
};

export default Project;
