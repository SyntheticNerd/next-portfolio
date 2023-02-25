import { useS3Upload } from "next-s3-upload";
import React, { useState } from "react";
import { technologies } from "../../../utils/dummyData";
import { useImgFileHandler } from "../../../utils/hooks/useImageHandler";
import formClasses from "../../../styles/forms.module.scss";
import classes from "./adminProjects.module.scss";
import Image from "next/image";
import CollapsibleTitle from "../collapsibleTitle";
import clsx from "clsx";
import { ProjectType } from "../../../utils/types";
import { useRouter } from "next/router";

const ProjectForm = ({ project }: { project?: ProjectType }) => {
	const router = useRouter();
	const [collapseTechUsed, setCollapseTechUsed] = useState(true);
	const [creating, setCreating] = useState(false);

	const [title, setTitle] = useState<string>(project ? project.title : "");
	const [body, setBody] = useState<string>(project ? project.body : "");
	const [github, setGithub] = useState<string>(project ? project.github : "");
	const [liveSite, setLiveSite] = useState<string>(
		project ? project.liveSite : ""
	);

	const desktopImg = useImgFileHandler(project ? project.deskImgUrl : "");
	const tabletImg = useImgFileHandler(project ? project.tabletImgUrl : "");
	const mobileImg = useImgFileHandler(project ? project.mobileImgUrl : "");

	const [techSelected, setTechSelected] = useState<string[]>(
		project ? project.techSelected : []
	);
	const [otherTech, setOtherTech] = useState<string>("");
	const [techOptions, setTechOptions] = useState(technologies);

	const [alignLeft, setAlignLeft] = useState(
		project ? project.alignLeft : true
	);
	const [featured, setFeatured] = useState(project ? project.featured : false);

	const addOtherTechHandler = () => {
		if (techOptions.indexOf(otherTech) >= 0) {
			addTechHandler(otherTech);
		} else {
			setTechOptions((old) => [...old, otherTech]);
			setTechSelected((old) => [...old, otherTech]);
		}
		setOtherTech("");
	};

	const addTechHandler = (tech: string) => {
		if (techSelected.indexOf(tech) < 0) {
			setTechSelected((old) => [...old, tech]);
		} else {
			setTechSelected((old) => old.filter((item) => item !== tech));
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
		setFeatured(false);
	};

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let _data = {
			_id: project?._id,
			title: title,
			body: body,
			github: github,
			liveSite: liveSite,
			deskImgUrl: desktopImg.url,
			tabletImgUrl: tabletImg.url,
			mobileImgUrl: mobileImg.url,
			alignLeft: alignLeft,
			techSelected: techSelected,
			featured: featured,
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
		if (response.ok && !project) {
			resetForm();
		}
		router.replace(router.asPath);
	};
	return (
		<>
			{project ? (
				<CollapsibleTitle
					onClick={() => setCreating((old) => !old)}
					open={creating}
					id={project._id!}
				>
					{project.title}
				</CollapsibleTitle>
			) : (
				<button onClick={() => setCreating((old) => !old)}>
					{creating ? "Collapse Form" : "New Project Form"}
				</button>
			)}
			{creating && (
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
						<>
							<div className={classes.technologiesUsed}>
								{techOptions.map((tech) => (
									<div
										key={tech}
										className={clsx(
											techSelected.indexOf(tech) >= 0
												? classes.selectedTech
												: ""
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
							<div className={formClasses.inputWrapper}>
								<label htmlFor="otherTech">Other Tech</label>
								<input
									type="text"
									id="otherTech"
									value={otherTech}
									onChange={(e) => setOtherTech(e.target.value)}
								/>
								<button type="button" onClick={addOtherTechHandler}>
									add
								</button>
							</div>
						</>
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
					<div className={formClasses.checkboxWrapper}>
						<input
							type="checkbox"
							name="featured"
							id="featured"
							onChange={() => setFeatured((old) => !old)}
							checked={featured}
						/>
						<label htmlFor="featured">Featured</label>
					</div>

					<button>Save Project</button>
				</form>
			)}
		</>
	);
};

export default ProjectForm;
