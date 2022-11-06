import React from "react";
import { motion } from "framer-motion";
import classes from "./clockBtn.module.css";
import BorderWrapper from "../../props/borderWrapper";
import ClockFace from "../../props/icons/clock-face";

const ClockBtn = () => {
  return (
    <BorderWrapper
      className={classes.btnShadow}
      borderRadius='80px'
      borderSize='2px'
    >
      <button className={classes.clockBtn}>
        <div className={classes.face}>
          <ClockFace />
        </div>
        <div className={classes.minute}></div>
        <div className={classes.hour}></div>
        <div className={classes.second}></div>
      </button>
    </BorderWrapper>
  );
};

export default ClockBtn;
