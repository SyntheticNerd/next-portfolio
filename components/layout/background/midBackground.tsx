import React from "react";
import classes from "./midBackground.module.scss";
import Image from "next/image";
import smallDecoration from "./images/decoration-small.png";
import mediumDecoration from "./images/decoration-medium.png";
import largeDecoration from "./images/decoration-large.png";
import clsx from "clsx";
interface Props {
	children: React.ReactNode;
}

const MidBackground = ({ children }: Props) => {
	return (
		<div className={classes.midBackground}>
			<div className={classes.bgWrapper}>
				<div className={classes.midTop} />
				<div className={classes.midMid} />
				<div className={classes.midBottom} />
			</div>
			<Image
				className={clsx(classes.decoration, classes.small)}
				src={smallDecoration}
				alt=""
			/>
			<Image
				className={clsx(classes.decoration, classes.medium)}
				src={mediumDecoration}
				alt=""
			/>
			<Image
				className={clsx(classes.decoration, classes.large)}
				src={largeDecoration}
				alt=""
			/>
			{children}
		</div>
	);
};

export default MidBackground;
