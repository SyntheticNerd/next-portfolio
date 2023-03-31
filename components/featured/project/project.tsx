import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { ProjectType } from "../../../utils/types";
import Pictures from "./pictures";
import classes from "./project.module.scss";
import Summary from "./summary";
import { Parallax } from "react-scroll-parallax";
import { useAppSelector } from "../../../features/store";
import { windowSizeState } from "../../../features/ui/uiSlice";

const Project = ({
	projectData,
	i,
}: {
	projectData: ProjectType;
	i: number;
}) => {
	const [alignLeft, setAlignLeft] = useState(projectData.alignLeft);
	const direction = alignLeft ? 1 : -1;

	const [topOffset1, setTopOffset1] = useState(0);
	const [topOffset2, setTopOffset2] = useState(0);

	const [clientHeight1, setClientHeight1] = useState(0);
	const [clientHeight2, setClientHeight2] = useState(0);

	const screen = useAppSelector(windowSizeState);

	const container1 = useRef<HTMLDivElement>(null);
	const container2 = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (container1.current && container2.current) {
			setTopOffset1(
				container1.current.getBoundingClientRect().top +
					window.pageYOffset -
					container1.current.clientHeight
			);
			setTopOffset2(
				container2.current.getBoundingClientRect().top +
					window.pageYOffset -
					container2.current.clientHeight
			);
			setClientHeight1(container1.current.clientHeight);
			setClientHeight2(container2.current.clientHeight);
		}
	}, [container1, container2]);

	const endModifier1 =
		screen.height > clientHeight1 ? clientHeight1 : screen.height;
	const endModifier2 =
		screen.height > clientHeight2 ? clientHeight2 : screen.height;

	const scrollStart1 = topOffset1 - screen.height / 2;
	const scrollEnd1 = topOffset1 - 150 + endModifier1 * 0.2;
	// const scrollStart1 = topOffset1 - clientHeight1 * 2;
	// const scrollEnd1 = topOffset1 - clientHeight1;
	const scrollStart2 = topOffset2 - screen.height * 0.2;
	const scrollEnd2 = topOffset2 - 150 + endModifier2 * 0.2;
	// const scrollStart2 = topOffset2 - clientHeight2;
	// const scrollEnd2 = topOffset2;

	return (
		<div className={clsx(alignLeft ? classes.project : classes.projectFlip)}>
			<Parallax
				className={classes.summaryParallax}
				translateX={[-200 * direction, 0]}
				startScroll={scrollStart1}
				endScroll={scrollEnd1}
				targetElement={container1.current ? container1.current : undefined}
			>
				<div ref={container1} className={classes.summary}>
					<Summary projectData={projectData} />
				</div>
			</Parallax>
			<Parallax
				className={classes.imageContainer}
				translateX={[200 * direction, 0]}
				startScroll={scrollStart2}
				endScroll={scrollEnd2}
				targetElement={container2.current ? container2.current : undefined}
			>
				<div ref={container2}>
					<h2>{projectData.title}</h2>
					<Pictures projectData={projectData} />
					<div className={classes.techStack}>
						{projectData.techSelected.map((tech) => (
							<b key={tech}>{tech}</b>
						))}
					</div>
				</div>
			</Parallax>
		</div>
	);
};

export default Project;
