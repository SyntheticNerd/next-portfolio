import React from "react";
import BorderWrapper from "../../props/borderWrapper";
import classes from "./buttons.module.css";

interface NavItem {
  id: string;
  title: string;
  x?: number;
  y?: number;
}
interface Props {
  btnData: NavItem;
  onClick: () => void;
}

const NavBtn = ({ btnData, onClick }: Props) => {
  return (
    <BorderWrapper
      className={classes.btnShadow}
      borderRadius='50%'
      borderSize='2px'
    >
      <button className={classes.navBtn} onClick={onClick}>
        {btnData.title}
      </button>
    </BorderWrapper>
  );
};

export default NavBtn;
