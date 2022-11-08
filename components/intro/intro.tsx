import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactTyped from "react-typed";
import useMousePosition from "../../utils/hooks/useMousePosition";
import BorderWrapper from "../props/borderWrapper";

const Intro = () => {
  const mousePosition = useMousePosition();

  return (
    <BorderWrapper>
      <div>
        <h1>Hello,</h1>
        <h1>{/* I'm <GoldSpan className='name'>Andrew</GoldSpan>, */}</h1>
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
  );
};

export default Intro;
