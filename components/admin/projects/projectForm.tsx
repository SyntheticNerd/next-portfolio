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
import GoldBtnSmall from "../../props/goldBtn-small";
import LoadingSpinner from "../../props/loadingSpinner";
import ArticleForm from "./ArticleForm";
import { useProjectForm } from "./hooks/useProjectForm";
import { useArticleForm } from "./hooks/useArticleForm";

const ProjectForm = ({ project }: { project?: ProjectType }) => {
	const router = useRouter();
	const {
		collapseTechUsed,
		setCollapseTechUsed,
		creating,
		setCreating,
		title,
		setTitle,
		body,
		setBody,
		github,
		setGithub,
		liveSite,
		setLiveSite,
		desktopImg,
		tabletImg,
		mobileImg,
		techSelected,
		setTechSelected,
		otherTech,
		setOtherTech,
		techOptions,
		setTechOptions,
		alignLeft,
		setAlignLeft,
		featured,
		setFeatured,
		FileInput,
		openFileDialog,
		uploadToS3,
		addOtherTechHandler,
		addTechHandler,
		resetForm,
		loading,
		setLoading,
	} = useProjectForm(project);

	const articleHook = useArticleForm(project);

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
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
			article: articleHook.article,
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
			setLoading(false);
			if (!project) {
				resetForm();
			}
			router.replace(router.asPath);
		} else {
			setLoading(false);
			alert("There was a problem saving.");
		}
	};
	const [articleOpen, setArticleOpen] = useState(false);

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
				<GoldBtnSmall
					onClick={() => setCreating((old) => !old)}
					borderStyle={{ marginBottom: "16px" }}
				>
					{creating ? "Collapse Form" : "New Project Form"}
				</GoldBtnSmall>
			)}
			{creating && (
				<>
					<form onSubmit={submitHandler} className={classes.projectForm}>
						{!loading ? (
							<>
								<GoldBtnSmall type="submit" borderClass={classes.saveBtn}>
									Save Project
								</GoldBtnSmall>
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
								<div className={classes.images}>
									<div className={formClasses.inputWrapper}>
										<label htmlFor="project-desktopImage">
											Upload Desktop Image
											{desktopImg.url.length > 0 && (
												<Image
													src={desktopImg.url}
													alt="temp-desk-img"
													width={200}
													height={150}
												/>
											)}
										</label>{" "}
										<input
											className={formClasses.fileInput}
											type="file"
											id="project-desktopImage"
											onChange={desktopImg.changeHandler}
											accept="image/png, image/jpeg"
										/>
									</div>
									<div className={formClasses.inputWrapper}>
										<label htmlFor="project-tabletImage">
											Upload Tablet Image
											{tabletImg.url.length > 0 && (
												<Image
													src={tabletImg.url}
													alt="temp-desk-img"
													width={100}
													height={100}
												/>
											)}
										</label>
										<input
											className={formClasses.fileInput}
											type="file"
											id="project-tabletImage"
											onChange={tabletImg.changeHandler}
											accept="image/png, image/jpeg"
										/>
									</div>
									<div className={formClasses.inputWrapper}>
										<label htmlFor="project-mobileImage">
											Upload Mobile Image
											{mobileImg.url.length > 0 && (
												<Image
													src={mobileImg.url}
													alt="temp-desk-img"
													width={100}
													height={100}
												/>
											)}
										</label>
										<input
											className={formClasses.fileInput}
											type="file"
											id="project-mobileImage"
											placeholder="Drag File Here"
											onChange={mobileImg.changeHandler}
											accept="image/png, image/jpeg"
										/>
									</div>
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
											<GoldBtnSmall
												type="button"
												onClick={addOtherTechHandler}
												borderStyle={{ marginTop: "8px" }}
											>
												add
											</GoldBtnSmall>
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
								<GoldBtnSmall onClick={() => setArticleOpen((old) => !old)}>
									{project
										? project.article
											? articleOpen
												? "Close Article"
												: "Open Article"
											: articleOpen
											? "Close Article"
											: "Add Article"
										: "Add Article"}
								</GoldBtnSmall>
								{articleOpen && <ArticleForm articleHook={articleHook} />}
							</>
						) : (
							<div
								style={{
									width: "100%",
									height: "300px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<LoadingSpinner />
							</div>
						)}
					</form>
				</>
			)}
		</>
	);
};

export default ProjectForm;
