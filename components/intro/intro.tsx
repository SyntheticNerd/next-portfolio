import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ReactTyped from "react-typed";
import useMousePosition from "../../utils/hooks/useMousePosition";
import BorderWrapper from "../props/borderWrapper";
import classes from "./intro.module.scss";
import Ticker from "./ticker";

const skillList = [
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "Python",
  "C++",
  "React",
  "Next.JS",
  "Redux",
  "Redux Toolkit",
  "Node",
  "Express",
  "MongoDB",
  "Mongoose",
  "SQL",
  "MySql",
  "Sequelize",
  "Firebase",
  "UX Design",
  "Figma",
];

const Intro = () => {
  const introRef = useRef<HTMLDivElement>(null);

  const mousePosition = useMousePosition(introRef);

  return (
    <div className={classes.introWrapper}>
      <motion.div
        ref={introRef}
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
              {/* TODO Redirect to about me sectioni */}
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
                typeSpeed={25}
                backSpeed={50}
                loop
              />
            </h2>
          </div>
        </BorderWrapper>
      </motion.div>
      <Ticker baseVelocity={-3}>
        {skillList.map((skill) => (
          <p key={skill}>{skill}</p>
        ))}
      </Ticker>
    </div>
  );
};

export default Intro;
