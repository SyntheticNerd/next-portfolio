import Image from "next/image";
import React from "react";
import classes from "./background.module.css";

interface Props {
  children: React.ReactNode;
}

const Background = ({ children }: Props) => {
  return (
    <div className={classes.background}>
      {/* <Image src='/images/bg-main.png' fill alt='' /> */}
      {children}
    </div>
  );
};

export default Background;
