import React, { useState } from "react";
import BorderWrapper from "../../props/borderWrapper";
import classes from "./buttons.module.css";
import { motion } from "framer-motion";

interface NavItem {
  id: string;
  title: string;
  x?: number;
  y?: number;
  Icon?: React.ElementType;
}
interface Props {
  btnData: NavItem;
  onClick: () => void;
  wasDragged: boolean;
}

const measureText = (text: string) => {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  ctx!.font = "20px bold Sans-Serif";
  let width = ctx!.measureText(text).width;
  return width;
};

const NavBtn = ({ btnData, onClick, wasDragged }: Props) => {
  const [hover, setHover] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  return (
    <BorderWrapper
      className={classes.btnShadow}
      borderRadius='80px'
      borderSize='2px'
    >
      <button
        title={btnData.title}
        className={classes.navBtn}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setHover(false);
        }}
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
      >
        {btnData.Icon && (
          <div className={classes.iconWrapper}>
            <btnData.Icon />
          </div>
        )}

        <motion.p
          initial={{ width: "0px" }}
          animate={{
            width:
              hover && !mouseDown ? `${measureText(btnData.title)}px` : "0px",
          }}
          transition={{ duration: 0.005, ease: "easeIn" }}
        >
          {btnData.title && btnData.title}
        </motion.p>
      </button>
    </BorderWrapper>
  );
};

export default NavBtn;
