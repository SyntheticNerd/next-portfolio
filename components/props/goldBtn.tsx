import React from "react";

interface Props {
  onClick?: () => void;
}

const GoldBtn = ({ onClick }: Props) => {
  return <button onClick={onClick}>GoldBtn</button>;
};

export default GoldBtn;
