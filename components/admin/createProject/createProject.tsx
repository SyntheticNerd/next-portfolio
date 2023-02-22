import clsx from "clsx";
import React, { ChangeEventHandler, useState } from "react";
import formClasses from "../../../styles/forms.module.scss";
import classes from "./createProject.module.scss";
import Chevron from "../../props/icons/chevron";
import { useS3Upload } from "next-s3-upload";
import CollapsibleTitle from "../collapsibleTitle";
import Image from "next/image";

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

const useImgFileHandler = () => {
	let [url, setUrl] = useState<string>("");
	let [file, setFile] = useState<File>();
	let changeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget && event.currentTarget.files) {
			let file = event.currentTarget.files[0];
			// let { url } = await uploadToS3(file);
			setUrl(URL.createObjectURL(file));
			setFile(file);
		}
	};
	const reset = () => {
		setUrl("");
		setFile(undefined);
	};
	return { url, file, changeHandler, reset };
};

const CreateProject = () => {
	const [collapseProjects, setCollapseProjects] = useState(true);
	const [collapseTechUsed, setCollapseTechUsed] = useState(true);

	const [title, setTitle] = useState<string>("");
	const [body, setBody] = useState<string>("");
	const [github, setGithub] = useState<string>("");
	const [liveSite, setLiveSite] = useState<string>("");

	const desktopImg = useImgFileHandler();
	const tabletImg = useImgFileHandler();
	const mobileImg = useImgFileHandler();

	const [techSelected, setTechSelected] = useState<string[]>([]);
	const [alignLeft, setAlignLeft] = useState(true);

	const addTechHandler = (tech: string) => {
		if (techSelected.indexOf(tech) < 0) {
			setTechSelected((old) => [...old, tech]);
		} else {
			setTechSelected((old) => old.filter((_tech) => _tech !== tech));
		}
	};

	let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

	const resetForm = () => {
		setTitle("");
		setBody("");
		setGithub("");
		setLiveSite("");
		desktopImg.reset();
		tabletImg.reset();
		mobileImg.reset();
		setTechSelected([]);
		setAlignLeft(true);
	};

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let _data = {
			title: title,
			body: body,
			github: github,
			liveSite: liveSite,
			deskImgUrl: "",
			tabletImgUrl: "",
			mobileImgUrl: "",
			alignLeft: alignLeft,
			techSelected: techSelected,
		};
		if (desktopImg.file) {
			let { url } = await uploadToS3(desktopImg.file);
			if (url) {
				_data.deskImgUrl = url;
			}
		}
		if (tabletImg.file) {
			let { url } = await uploadToS3(tabletImg.file);
			if (url) {
				_data.tabletImgUrl = url;
			}
		}
		if (mobileImg.file) {
			let { url } = await uploadToS3(mobileImg.file);
			if (url) {
				_data.mobileImgUrl = url;
			}
		}

		const response = await fetch("/api/projects", {
			method: "POST",
			body: JSON.stringify(_data),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			resetForm();
		}
	};

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
				<form onSubmit={submitHandler}>
					<div className={formClasses.inputWrapper}>
						<label htmlFor="project-title">Title</label>
						<input
							type="text"
							id="project-title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className={formClasses.inputWrapper}>
						<label htmlFor="project-body">Body</label>
						<textarea
							id="project-body"
							value={body}
							onChange={(e) => setBody(e.target.value)}
						/>
					</div>
					<div className={formClasses.inputWrapper}>
						<label htmlFor="project-github">Github</label>
						<input
							type="text"
							id="project-github"
							value={github}
							onChange={(e) => setGithub(e.target.value)}
						/>
					</div>
					<div className={formClasses.inputWrapper}>
						<label htmlFor="project-live">Live Site</label>
						<input
							type="text"
							id="project-live"
							value={liveSite}
							onChange={(e) => setLiveSite(e.target.value)}
						/>
					</div>
					<div className={formClasses.inputWrapper}>
						<label htmlFor="project-desktopImage">Upload Desktop Image</label>
						<input
							className={formClasses.fileInput}
							type="file"
							id="project-desktopImage"
							onChange={desktopImg.changeHandler}
							accept="image/png, image/jpeg"
						/>
						{desktopImg.url.length > 0 && (
							<Image
								src={desktopImg.url}
								alt="temp-desk-img"
								width={200}
								height={150}
							/>
						)}
					</div>
					<div className={formClasses.inputWrapper}>
						<label htmlFor="project-tabletImage">Upload Tablet Image</label>
						<input
							className={formClasses.fileInput}
							type="file"
							id="project-tabletImage"
							onChange={tabletImg.changeHandler}
							accept="image/png, image/jpeg"
						/>
						{tabletImg.url.length > 0 && (
							<Image
								src={tabletImg.url}
								alt="temp-desk-img"
								width={100}
								height={100}
							/>
						)}
					</div>
					<div className={formClasses.inputWrapper}>
						<label htmlFor="project-mobileImage">Upload Mobile Image</label>
						<input
							className={formClasses.fileInput}
							type="file"
							id="project-mobileImage"
							placeholder="Drag File Here"
							onChange={mobileImg.changeHandler}
							accept="image/png, image/jpeg"
						/>
						{mobileImg.url.length > 0 && (
							<Image
								src={mobileImg.url}
								alt="temp-desk-img"
								width={100}
								height={100}
							/>
						)}
					</div>
					<CollapsibleTitle
						onClick={() => {
							setCollapseTechUsed((old) => !old);
						}}
						open={collapseTechUsed}
						id="techUsedCollapseBtn"
					>
						Tech Used
					</CollapsibleTitle>
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
					<div className={classes.radioWrapper}>
						<div className={formClasses.radioInputWrapper}>
							<input
								type="radio"
								id="project-align-left"
								name="alignment"
								checked={alignLeft}
								onChange={() => setAlignLeft(true)}
							/>
							<label htmlFor="project-align-left">Align Left</label>
						</div>
						<div className={formClasses.radioInputWrapper}>
							<input
								type="radio"
								id="project-align-right"
								name="alignment"
								checked={!alignLeft}
								onChange={() => setAlignLeft(false)}
							/>
							<label htmlFor="project-align-right">Align Right</label>
						</div>
					</div>

					<button>Save Project</button>
				</form>
			)}
		</div>
	);
};

export default CreateProject;
