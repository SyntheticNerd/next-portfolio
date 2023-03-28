import React, { ChangeEventHandler, useState } from "react";
import classes from "./adminProjects.module.scss";
import CollapsibleTitle from "../collapsibleTitle";
import ProjectForm from "./projectForm";
import { useAppSelector } from "../../../features/store";
import { currentProjects } from "../../../features/admin/projectsSlice";
import { ProjectType } from "../../../utils/types";

const AdminProjects = () => {
	const [collapseProjects, setCollapseProjects] = useState(true);
	const projects = useAppSelector<ProjectType[]>(currentProjects);

	return (
		<div className={classes.createProjectWrapper}>
			<CollapsibleTitle
				onClick={() => {
					setCollapseProjects((old) => !old);
				}}
				open={collapseProjects}
				id="collapseProject"
			>
				<h3>Projects</h3>
			</CollapsibleTitle>
			{!collapseProjects && (
				<div className={classes.collapseArea}>
					<ProjectForm />
					{projects.map((project) => (
						<ProjectForm key={project._id} project={project} />
					))}
				</div>
			)}
		</div>
	);
};

export default AdminProjects;
