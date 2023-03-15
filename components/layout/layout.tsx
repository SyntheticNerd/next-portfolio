import { SessionProvider } from "next-auth/react";
import React, { ReactNode, useEffect } from "react";
import { useAppDispatch } from "../../features/store";
import { setWindowSize } from "../../features/ui/uiSlice";
import NavBar from "./navigation/navBar";

interface Props {
	children: ReactNode;
}

const Layout = ({ children }: Props) => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(
			setWindowSize({ width: window.innerWidth, height: window.innerHeight })
		);
		function handleResize() {
			console.log(window.innerWidth);
			dispatch(
				setWindowSize({ width: window.innerWidth, height: window.innerHeight })
			);
		}

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return (
		<SessionProvider>
			<NavBar />
			{children}
			<footer></footer>
		</SessionProvider>
	);
};

export default Layout;
