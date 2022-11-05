import clsx from "clsx";
import React from "react";
import classes from "./buttons.module.css";

interface Props {
  navOpen: boolean;
  onClick: () => void;
}

const MenuBtn = ({ navOpen, onClick }: Props) => {
  return (
    <div>
      <button
        className={clsx(
          classes.menuBtn,
          navOpen ? classes.menuOpen : classes.menuClose
        )}
        onClick={onClick}
      >
        <div className={clsx(classes.line, classes.line1)} />
        <div className={clsx(classes.line, classes.line2)} />
        <div className={clsx(classes.line, classes.line3)} />
      </button>
    </div>
  );
};

export default MenuBtn;
