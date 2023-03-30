import React from "react";
import { currentProjects } from "../../features/admin/projectsSlice";
import { useAppSelector } from "../../features/store";
import { ProjectType } from "../../utils/types";
import classes from "./featured.module.scss";
import Project from "./project/project";

const Featured = () => {
	const projects = useAppSelector<ProjectType[]>(currentProjects);
	return (
		<div className={classes.featured}>
			{projects.map((project, i) => (
				<Project i={i} key={project._id} projectData={project} />
			))}
		</div>
	);
};

export default Featured;
