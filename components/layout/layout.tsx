import React, { ReactNode } from "react";
import NavBar from "./navigation/navBar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
