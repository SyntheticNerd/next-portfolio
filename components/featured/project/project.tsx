import clsx from "clsx";
import React, { useState } from "react";
import { ProjectType } from "../../../utils/types";
import Pictures from "./pictures";
import classes from "./project.module.scss";
import Summary from "./summary";

const Project = ({ projectData }: { projectData: ProjectType }) => {
	const [alignLeft, setAlignLeft] = useState(projectData.alignLeft);

	return (
		<div className={clsx(alignLeft ? classes.project : classes.projectFlip)}>
			<Summary projectData={projectData} />
			<div className={classes.imageContainer}>
				<Pictures projectData={projectData}/>
				<div className={classes.techStack}>
					{projectData.techSelected.map((tech) => (
						<b key={tech}>{tech}</b>
					))}
				</div>
			</div>
		</div>
	);
};

export default Project;
