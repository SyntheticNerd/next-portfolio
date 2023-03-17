import React from "react";
import classes from "./aboutMe.module.scss";

interface Props {
	children: React.ReactNode;
	onClick: (e: MouseEvent | TouchEvent | PointerEvent) => void;
}

const Tab = ({ children, onClick }: Props) => {
	return (
		<div onClick={onClick} className={classes.tab}>
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 209 45"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M179 16C179 7.16344 171.837 0 163 0H48C39.1634 0 32 7.16344 32 16V29C32 37.8366 24.8366 45 16 45H0.75H209H195C186.163 45 179 37.8366 179 29V16Z"
					fill="current"
				/>
			</svg>
			{children}
		</div>
	);
};

export default Tab;
