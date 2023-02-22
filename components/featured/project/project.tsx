import clsx from "clsx";
import React, { useState } from "react";
import Pictures from "./pictures";
import classes from "./project.module.scss";
import Summary from "./summary";

const Project = () => {
	const [alignLeft, setAlignLeft] = useState(true);

	return (
		<div className={clsx(alignLeft ? classes.project : classes.projectFlip)}>
			<Summary />
			<div className={classes.imageContainer}>
				<Pictures />
				<div className={classes.techStack}>
					<b>React</b>
					<b>Redux</b>
					<b>Styled Components</b>
				</div>
			</div>
		</div>
	);
};

export default Project;
