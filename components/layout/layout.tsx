import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import NavBar from "./navigation/navBar";

interface Props {
	children: ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<SessionProvider>
			<NavBar />
			{children}

			<footer></footer>
		</SessionProvider>
	);
};

export default Layout;
