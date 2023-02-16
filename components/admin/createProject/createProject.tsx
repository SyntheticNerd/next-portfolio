import clsx from "clsx";
import React, { ChangeEventHandler, useState } from "react";
import formClasses from "../../../styles/forms.module.scss";
import classes from "./createProject.module.scss";
import Chevron from "../../icons/chevron";
import { useS3Upload } from "next-s3-upload";

const technologies = [
	"JavaScript",
	"TypeScript",
	"HTML",
	"CSS",
	"Python",
	"C++",
	"React",
	"Next.JS",
	"Redux",
	"Redux Toolkit",
	"Django",
	"Node",
	"Express",
	"Webpack",
	"MongoDB",
	"Mongoose",
	"SQL",
	"MySql",
	"Sequelize",
	"PostgreSQL",
	"Firebase",
	"RT/Storage",
	"DB",
	"Cloud Functions",
	"Firebase SDK",
	"AWS",
	"Amplify",
	"Lambda",
	"CloudFront",
	"Agile Methodologies",
	"Scrum Development",
	"Debugging",
	"Unit Testing",
	"Performance Testing",
	"Docker",
	"Kubernetes",
	"UX Design",
	"Information Architecture",
	"Figma",
	"XD",
	"Photoshop",
	"Illustrator",
	"User Surveys",
	"Interviews",
	"Personas",
	"User Testing",
];

const CreateProject = () => {
	const [techSelected, setTechSelected] = useState<string[]>([]);
	const [collapseTechUsed, setCollapseTechUsed] = useState(true);

	let [imageUrl, setImageUrl] = useState<string>();
	let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

	const addTechHandler = (tech: string) => {
		if (techSelected.indexOf(tech) < 0) {
			setTechSelected((old) => [...old, tech]);
		} else {
			setTechSelected((old) => old.filter((_tech) => _tech !== tech));
		}
	};

	let handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget && event.currentTarget.files) {
			let file = event.currentTarget.files[0];
			let { url } = await uploadToS3(file);
			setImageUrl(url);
		}
	};
	return (
		<div className={classes.createProjectWrapper}>
			<form action="">
				<h3>Projects</h3>
				<div className={formClasses.inputWrapper}>
					<label htmlFor="project-title">Title</label>
					<input type="text" id="project-title" />
				</div>
				<div className={formClasses.inputWrapper}>
					<label htmlFor="project-body">Body</label>
					<textarea id="project-body" />
				</div>
				<div className={formClasses.inputWrapper}>
					<label htmlFor="project-desktopImage">Upload Desktop Image</label>
					<input
						className={formClasses.fileInput}
						type="file"
						id="project-desktopImage"
						onChange={handleFileChange}
						accept="image/png, image/jpeg"
					/>
				</div>
				<div className={formClasses.inputWrapper}>
					<label htmlFor="project-tabletImage">Upload Tablet Image</label>
					<input
						className={formClasses.fileInput}
						type="file"
						id="project-tabletImage"
						onChange={handleFileChange}
						accept="image/png, image/jpeg"
					/>
				</div>
				<div className={formClasses.inputWrapper}>
					<label htmlFor="project-mobileImage">Upload Mobile Image</label>
					<input
						className={formClasses.fileInput}
						type="file"
						id="project-mobileImage"
						placeholder="Drag File Here"
						onChange={handleFileChange}
						accept="image/png, image/jpeg"
					/>
				</div>
				<div className={formClasses.inputWrapper}>
					<label htmlFor="project-github">Github</label>
					<input type="text" id="project-github" />
				</div>
				<div className={formClasses.inputWrapper}>
					<label htmlFor="project-live">Live Site</label>
					<input type="text" id="project-live" />
				</div>
				<div className={formClasses.collapsibleTitle}>
					<label className={classes.extraLabel} htmlFor="techUsedCollapseBtn">
						Tech Used
					</label>
					<button
						onClick={() => {
							setCollapseTechUsed((old) => !old);
						}}
						type="button"
						id="techUsedCollapseBtn"
						style={{
							transform: collapseTechUsed ? "rotate(180deg)" : "rotate(0deg)",
						}}
					>
						<Chevron />
					</button>
				</div>
				{!collapseTechUsed && (
					<div className={classes.technologiesUsed}>
						{technologies.map((tech) => (
							<div
								key={tech}
								className={clsx(
									techSelected.indexOf(tech) >= 0 ? classes.selectedTech : ""
								)}
							>
								<label htmlFor={tech}>{tech}</label>
								<input
									onChange={(e) => {
										addTechHandler(e.target.id);
									}}
									type="checkbox"
									name={tech}
									id={tech}
								/>
							</div>
						))}
					</div>
				)}
				<button>Save Project</button>
			</form>
		</div>
	);
};

export default CreateProject;
