import React from "react";
import classes from "./footer.module.scss";
import initialNavItems from "../navigation/navBtnData";
import NavBtn from "../navigation/navBtn";
import commonClasses from "../../../styles/common.module.scss";
import clsx from "clsx";

const Footer = () => {
	return (
		<footer className={classes.footer}>
			<div className={classes.content}>
				<div className={classes.navItems}>
					{initialNavItems
						.filter((item) => item.id !== "clock")
						.map((btnData) => (
							<NavBtn key={btnData.id} btnData={btnData} onClick={() => {}} />
						))}
				</div>
				<p className={clsx(classes.copyright, commonClasses.goldText)}>
					©2023 Andrew Schroepfer
				</p>
			</div>
			<div className={classes.background} />
		</footer>
	);
};

export default Footer;
