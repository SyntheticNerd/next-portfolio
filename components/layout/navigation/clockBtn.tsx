import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import classes from "./clockBtn.module.css";
import BorderWrapper from "../../props/borderWrapper";
import ClockFace from "../../props/icons/clock-face";

const ClockBtn = () => {
  const [time, setTime] = useState({ hour: 0, minute: 0 });
  const [to, setTo] = useState<NodeJS.Timeout>();

  const updateTime = () => {
    const date = new Date();
    setTime({ hour: date.getHours(), minute: date.getMinutes() });
    let timeout = setTimeout(() => {
      updateTime();
    }, 10000);
    setTo(timeout);
  };

  useEffect(() => {
    if (!to) {
      updateTime();
    }
  }, []);

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
        <motion.div
          animate={{ rotate: `${6 * time.minute}deg` }}
          className={classes.minute}
        ></motion.div>
        <motion.div
          animate={{ rotate: `${30 * time.hour}deg` }}
          className={classes.hour}
        ></motion.div>
        <div className={classes.second}></div>
        <div className={classes.centerDot}></div>
      </button>
    </BorderWrapper>
  );
};

export default ClockBtn;
