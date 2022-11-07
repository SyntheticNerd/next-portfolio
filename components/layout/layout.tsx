import React, { ReactNode } from "react";
import Background from "./background/background";
import NavBar from "./navigation/navBar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Background>
      <NavBar />
      <main>{children}</main>
    </Background>
  );
};

export default Layout;
