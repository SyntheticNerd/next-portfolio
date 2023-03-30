import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { ProjectType } from "../../../utils/types";
import Pictures from "./pictures";
import classes from "./project.module.scss";
import Summary from "./summary";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Parallax } from "react-scroll-parallax";

const Project = ({
	projectData,
	i,
}: {
	projectData: ProjectType;
	i: number;
}) => {
	const [alignLeft, setAlignLeft] = useState(projectData.alignLeft);
	const direction = alignLeft ? 1 : -1;

	const startScroll = -1000 * (i + 1) - i * 100;
	const endScroll = 800 * (i + 1) - i * 100;

	return (
		<div className={clsx(alignLeft ? classes.project : classes.projectFlip)}>
			<Parallax
				className={classes.summary}
				translateX={[`${-500 * direction}`, "0"]}
				startScroll={startScroll}
				endScroll={endScroll}
			>
				<Summary projectData={projectData} />
			</Parallax>
			<Parallax
				translateX={[`${500 * direction}`, "0"]}
				startScroll={startScroll}
				endScroll={endScroll}
				className={classes.imageContainer}
			>
				<h2>{projectData.title}</h2>
				<Pictures projectData={projectData} />
				<div className={classes.techStack}>
					{projectData.techSelected.map((tech) => (
						<b key={tech}>{tech}</b>
					))}
				</div>
			</Parallax>
		</div>
	);
};

export default Project;
