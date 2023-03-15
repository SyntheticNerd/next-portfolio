import React from "react";
import classes from "./midBackground.module.scss";

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

			{children}
		</div>
	);
};

export default MidBackground;
