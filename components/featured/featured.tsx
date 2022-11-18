import React from "react";
import classes from "./featured.module.scss";
import Project from "./project/project";

const Featured = () => {
  return (
    <div className={classes.featured}>
      <Project />
      <Project />
      <Project />
    </div>
  );
};

export default Featured;
