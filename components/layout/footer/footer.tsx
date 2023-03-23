import React from "react";
import classes from "./footer.module.scss";
import initialNavItems from "../navigation/navBtnData";
import NavBtn from "../navigation/navBtn";
import commonClasses from "../../../styles/common.module.scss";
import clsx from "clsx";
import { scroller } from "react-scroll";
import { useRouter } from "next/router";

const Footer = () => {
	const router = useRouter();
	const handleClick = (id: string) => {
		if (id === "github") {
			window.open("https://github.com/SyntheticNerd", "_blank");
		} else if (id === "linkedin") {
			window.open("https://www.linkedin.com/in/andrew-schroepfer/", "_blank");
		} else {
			scroller.scrollTo(id !== "/" ? id : "home", {
				duration: 800,
				delay: 0,
				smooth: "ease",
				offset: 0,
			});
			router.push(`/${id}`, undefined, { scroll: false });
		}
	};
	return (
		<footer className={classes.footer}>
			<div className={classes.content}>
				<div className={classes.navItems}>
					{initialNavItems
						.filter((item) => item.id !== "clock")
						.map((btnData) => (
							<NavBtn
								key={btnData.id}
								btnData={btnData}
								onClick={() => {
									handleClick(btnData.id);
								}}
							/>
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
