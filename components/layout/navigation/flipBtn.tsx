import React from "react";
import FlipIcon from "../../props/icons/flip-icon";
import classes from "./buttons.module.css";
interface Props {
  onClick: () => void;
  flip: boolean;
}

const FlipBtn = ({ onClick, flip }: Props) => {
  return (
    <button
      style={{
        margin: flip ? "0 0 0 8px" : "0 auto 8px",
        transform: flip ? "scaleX(-1)": "scaleX(1)",
      }}
      onClick={onClick}
      className={classes.flipBtn}
    >
      <FlipIcon />
    </button>
  );
};

export default FlipBtn;
