import React, { useState } from "react";
import BorderWrapper from "../../props/borderWrapper";
import classes from "./buttons.module.css";

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
}

const measureText = (text: string) => {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  ctx!.font = "16px Sans-Serif";
  let width = ctx!.measureText(text).width;
  return width;
};

const NavBtn = ({ btnData, onClick }: Props) => {
  const [hover, setHover] = useState(false);

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
        onMouseLeave={() => setHover(false)}
      >
        {btnData.Icon && (
          <div className={classes.iconWrapper}>
            <btnData.Icon />
          </div>
        )}

        <p
          style={{
            width: hover ? `${measureText(btnData.title)}px` : "0px",
          }}
        >
          {btnData.title && btnData.title}
        </p>
      </button>
    </BorderWrapper>
  );
};

export default NavBtn;
