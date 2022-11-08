import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactTyped from "react-typed";
import useMousePosition from "../../utils/hooks/useMousePosition";
import BorderWrapper from "../props/borderWrapper";
import classes from "./intro.module.scss";

const Intro = () => {
  const mousePosition = useMousePosition();

  return (
    <div className={classes.introWrapper}>
      <motion.div
        style={{
          boxShadow: "var(--nav-bar-shadow)",
          transformStyle: "preserve-3d",
        }}
        animate={{
          boxShadow:
            mousePosition.x && mousePosition.y
              ? `${Math.round(
                  (mousePosition.x - window.screen.width / 2) * -0.03
                )}px ${
                  Math.round(
                    (mousePosition.y - window.screen.height / 2) * -0.05
                  ) + 8
                }px 16px rgba(0, 0, 0, 0.5)`
              : "var(--nav-bar-shadow)",
          rotateY:
            mousePosition.x && mousePosition.y
              ? `${Math.round(
                  (mousePosition.x - window.screen.width / 2) * 0.02
                )}deg`
              : 0,
          rotateX:
            mousePosition.x && mousePosition.y
              ? `${Math.round(
                  (mousePosition.y - window.screen.height / 2) * -0.02
                )}deg`
              : 0,
        }}
      >
        <BorderWrapper>
          <div className={classes.intro}>
            <h1>Hello,</h1>
            <h1>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              I'm <span className={classes.name}>Andrew</span>,
            </h1>
            <h2>
              <ReactTyped
                strings={[
                  "Web Developer",
                  "UX Designer",
                  "Game Developer",
                  "Digital Artist",
                  "React Developer",
                ]}
                typeSpeed={35}
                backSpeed={50}
                loop
              />
            </h2>
          </div>
        </BorderWrapper>
      </motion.div>
    </div>
  );
};

export default Intro;
