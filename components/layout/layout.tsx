import React, { ReactNode } from "react";
import Background from "./background/background";
import NavBar from "./navigation/navBar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      {children}
      <Background />
    </>
  );
};

export default Layout;
