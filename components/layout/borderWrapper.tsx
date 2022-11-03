import React, { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  className?: string;
  borderSize?: string;
  borderRadius?: string;
}

const BorderWrapper = ({
  children,
  className,
  borderSize,
  borderRadius,
}: Props) => {
  return (
    <div
      style={{
        padding: borderSize ? borderSize : "4px",
        background: "var(--border-gradient)",
        height: "fit-content",
        width: "fit-content",
        borderRadius: borderRadius ? borderRadius : "0px",
        flexDirection: "inherit",
      }}
    >
      <div
        className={clsx(className)}
        style={{ borderRadius: borderRadius ? borderRadius : "0px" }}
      >
        {children}
      </div>
    </div>
  );
};

export default BorderWrapper;
