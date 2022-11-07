import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import classes from "./clockBtn.module.css";
import BorderWrapper from "../../props/borderWrapper";
import ClockFace from "../../props/icons/clock-face";

const measureText = (text: string) => {
  if (document) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    ctx!.font = "24px Sans-Serif bold";
    let width = ctx!.measureText(text).width;
    return width;
  }
};

function pad(number: number) {
  return (number < 10 ? "0" : "") + number;
}

interface Props {
  wasDragged: boolean;
  setWasDragged: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClockBtn = ({ wasDragged, setWasDragged }: Props) => {
  const [time, setTime] = useState({ hour: 0, minute: 0 });
  const [to, setTo] = useState<NodeJS.Timeout>();
  const [expand, setExpand] = useState(true);
  const [initialLoad, setInitialLoad] = useState(false);

  const updateTime = () => {
    const date = new Date();
    setTime({ hour: date.getHours(), minute: date.getMinutes() });
    let timeout = setTimeout(() => {
      updateTime();
    }, 5000);
    setTo(timeout);
  };

  useEffect(() => {
    setInitialLoad(true);
    if (!initialLoad) {
      updateTime();
    }
  }, []);

  useEffect(() => console.log(expand), [expand]);

  return (
    <BorderWrapper
      className={classes.btnShadow}
      borderRadius='80px'
      borderSize='2px'
      style={{ boxShadow: "var(--nav-btn-shadow)" }}
    >
      <button
        className={classes.clockBtn}
        onClick={() => {
          !wasDragged ? setExpand(!expand) : setWasDragged(false);
        }}
      >
        {expand ? (
          <div className={classes.clockFace}>
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
            <div className={classes.centerDot}></div>
          </div>
        ) : (
          <motion.div
            className={classes.analog}
            initial={{
              maxWidth: "80px",
              width: "3vw",
              minWidth: "40px",
            }}
            animate={{ maxWidth: "180px", width: "5vw", minWidth: "140px" }}
          >
            <p className={classes.dots}>{pad(time.hour % 12 ? time.hour % 12 : 12)}</p>
            <div></div>
            <p>{pad(time.minute)}</p>
            <p>{time.hour > 12 ? "pm" : "am"}</p>
          </motion.div>
        )}
      </button>
    </BorderWrapper>
  );
};

export default ClockBtn;
