import React from "react";
import BorderWrapper from "../../props/borderWrapper";
import GoldBtn from "../../props/goldBtn";
import GithubIcon from "../../props/icons/github-icon";
import classes from "./project.module.scss";
import btnClasses from "../../../styles/buttons.module.scss";
import WebpageIcon from "../../props/icons/webpage-icon";

const Summary = () => {
	return (
		<div className={classes.summary}>
			<h2>Creating a Shop.Tesla Clone with a Team</h2>
			<p>
				In this project I had the opportunity to bring a UX designers work to
				life. I used animations and paralax effects to keep users engaged.
			</p>
			<div>
				<BorderWrapper
					className={btnClasses.btnShadow}
					borderRadius="64px"
					borderSize="3px"
				>
					<button className={btnClasses.largePill}>Read Article</button>
				</BorderWrapper>
				<BorderWrapper
					className={btnClasses.btnShadow}
					borderRadius="50%"
					borderSize="3px"
				>
					<button className={btnClasses.github}>
						<GithubIcon />
					</button>
				</BorderWrapper>
				<BorderWrapper
					className={btnClasses.btnShadow}
					borderRadius="50%"
					borderSize="3px"
				>
					<button className={btnClasses.webPage}>
						<WebpageIcon />
					</button>
				</BorderWrapper>
			</div>
		</div>
	);
};

export default Summary;
